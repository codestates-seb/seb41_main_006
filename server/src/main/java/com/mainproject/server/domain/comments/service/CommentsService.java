package com.mainproject.server.domain.comments.service;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.LikeStatus;
import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.comments.entity.Comments;
import com.mainproject.server.domain.comments.repository.CommentsLikeRepository;
import com.mainproject.server.domain.comments.repository.CommentsRepository;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentsService {
	private final CommentsRepository commentsRepository;
	private final CommentsLikeRepository commentsLikeRepository;
	private final MemberService memberService;
	private final EntityManager entityManager;

	// ----- 댓글 등록
	public Comments createComments(Comments comments){

		Comments createdComments = new Comments();
		createdComments.setBoard(comments.getBoard());
		createdComments.setMember(comments.getMember());
		createdComments.setContent(comments.getContent());
		createdComments.setDepth(0);

		// 댓글 저장
		commentsRepository.save(createdComments);
		return createdComments;
	}

	// ----- 대댓글 등록
	public Comments createReComments(Long parentId, Comments comments){
		//대댓글의 parent를 찾아옵니다.
		Comments parent = commentsRepository.findById(parentId).orElse(null);

		//parent 가 null 이면 (대댓글이 아닌 댓글의 경우) exception
		if(parent == null){
			throw new IllegalArgumentException("Invalid parentId");
		}
		Comments replyComments = new Comments();
		replyComments.setContent(comments.getContent());
		replyComments.setBoard(comments.getBoard());
		replyComments.setMember(comments.getMember());
		replyComments.setDepth(parent.getDepth() + 1); // 댓글 depth = 0, 대댓글 depth = 1

		replyComments.setParentComments(parent);
		parent.getReplyComments().add(replyComments);

		//대댓글 저장
		commentsRepository.save(replyComments);
		return replyComments;
	}

	// ----- 댓글 수정
	public Comments updateComments(Comments comments){
		//유효한 댓글인지 검증
		Comments findComments = findVerifiedComments(comments.getCommentsId());

		// 수정
		Optional.ofNullable(comments.getContent())
			.ifPresent(findComments::setContent);

		// 수정 뒤 저장
		return commentsRepository.save(findComments);
	}

	// ----- 댓글 삭제
	@Transactional
	public void deleteParentComments(Long commentsId, MemberDetails memberDetails){
		Comments findComments = findVerifiedComments(commentsId);

		//유효한 작성자인지 검증
		validateCommentsWriter(findComments, memberDetails.getMemberId());

		//해당 댓글ID의 댓글 좋아요까지 함께 삭제
		entityManager.createQuery("delete from CommentsLike cl where cl.comments.commentsId = :commentsId")
				.setParameter("commentsId", commentsId)
				.executeUpdate();
		commentsRepository.delete(findComments);
	}

	// ----- 대댓글 삭제
	@Transactional
	public void deleteReplyComments(Long commentsId, MemberDetails memberDetails) {
		Comments findComments = findVerifiedComments(commentsId);

		//유효한 작성자인지 검증
		validateCommentsWriter(findComments, memberDetails.getMemberId());

		//대댓글인지 확인 : 유효한 대댓글 && parentId 가 null이 아닐 경우
		if(findComments != null && findComments.getParentComments() != null){
			Comments parentComments = findComments.getParentComments();
			parentComments.getReplyComments().remove(findComments);

			//해당 대댓글ID의 대댓글 좋아요까지 함께 삭제
			entityManager.createQuery("delete from CommentsLike cl where cl.comments.commentsId = :commentsId")
				.setParameter("commentsId", commentsId)
				.executeUpdate();

			commentsRepository.deleteById(commentsId);
			commentsRepository.saveAndFlush(parentComments);
		}
	}

	// ----- 댓글 검증
	public Comments findVerifiedComments(Long commentsId){
		Optional<Comments> optionalComments = commentsRepository.findById(commentsId);
		//유효하지 않은 댓글 - exception 발생
		Comments findComments =
			optionalComments.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENTS_NOT_FOUND));

		return findComments;
	}

	// ----- 댓글, 대댓글 정렬 (특정 게시물 조회 : getBoardWithSortedCommentsAndReplies 시에 사용)
	public List<Comments> getSortedCommentsByBoard(Board board) {
		List<Comments> comments = commentsRepository.findAllByBoardOrderByCreatedAtAscParentCommentsCommentsId(board);

		List<Comments> rootComments = comments.stream().filter(c -> c.getParentComments() == null).collect(Collectors.toList());
		List<Comments> result = new ArrayList<>();

		//재귀로 댓글에 대댓글 작성순 정렬
		for (Comments rootComment : rootComments) {
			result.addAll(getCommentsInOrder(rootComment));
		}
		return result;
	}

	private List<Comments> getCommentsInOrder(Comments comment) {
		List<Comments> result = new ArrayList<>();
		result.add(comment);

		//댓글에 대댓글 정렬
		for (Comments reply : comment.getReplyComments()) {
			result.addAll(getCommentsInOrder(reply));
		}
		return result;
	}

	// ----- 댓글 좋아요한 멤버 가져오기 : 각 게시글 당 좋아요한 멤버 알기 위해 사용
	public List<Long> findCommentsLikedMembers(Long commentsId, LikeStatus likeStatus){
		//CommentsLike 테이블에서 commentsId, likeStatus 같은 memberId 반환
		return commentsLikeRepository.findMemberIdsByCommentsIdAndLikeStatus(commentsId, likeStatus);
	}

	// ----- 작성자 검증
	public void validateCommentsWriter(Comments comments, long memberId){
		//validateVerifyMember : 존재하는 회원인지 검증
		Member member = memberService.validateVerifyMember(memberId);

		if(comments.getMember() != member){
			throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);
		}
	}
}
