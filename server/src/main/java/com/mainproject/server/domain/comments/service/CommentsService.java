package com.mainproject.server.domain.comments.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.mainproject.server.domain.LikeStatus;
import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.comments.entity.Comments;
import com.mainproject.server.domain.comments.repository.CommentsLikeRepository;
import com.mainproject.server.domain.comments.repository.CommentsRepository;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentsService {
	private final CommentsRepository commentsRepository;
	private final CommentsLikeRepository commentsLikeRepository;

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

		Comments parent = commentsRepository.findById(parentId).orElse(null);
		//parent 가 null 이면 (댓글의 경우) exception
		if(parent == null){
			throw new IllegalArgumentException("Invalid parentId");
		}
		Comments replyComments = new Comments();
		replyComments.setContent(comments.getContent());
		replyComments.setBoard(comments.getBoard());
		replyComments.setMember(comments.getMember());
		replyComments.setDepth(parent.getDepth() + 1);

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
	public void deleteParentComments(Long commentsId){
		Comments findComments = findVerifiedComments(commentsId);

		commentsRepository.delete(findComments);
	}

	// ----- 대댓글 삭제
	public void deleteReplyComments(Long commentsId) {
		Comments findComments = findVerifiedComments(commentsId);

		//대댓글인지 확인
		if(findComments != null && findComments.getParentComments() != null){
			Comments parentComments = findComments.getParentComments();
			parentComments.getReplyComments().remove(findComments);

			commentsRepository.deleteById(commentsId);
			commentsRepository.saveAndFlush(parentComments);
		}
	}

	// ----- 댓글 검증
	public Comments findVerifiedComments(Long commentsId){
		Optional<Comments> optionalComments = commentsRepository.findById(commentsId);
		Comments findComments =
			optionalComments.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENTS_NOT_FOUND));

		return findComments;
	}

	// ----- 댓글, 대댓글 정렬
	public List<Comments> getSortedCommentsByBoard(Board board) {
		List<Comments> comments = commentsRepository.findAllByBoardOrderByCreatedAtAscParentCommentsCommentsId(board);

		Map<Long, Comments> commentsMap = comments.stream().collect(Collectors.toMap(Comments::getCommentsId, c -> c));
		List<Comments> rootComments = comments.stream().filter(c -> c.getParentComments() == null).collect(Collectors.toList());
		List<Comments> result = new ArrayList<>();

		for (Comments rootComment : rootComments) {
			result.addAll(getCommentsInOrder(rootComment));
		}
		return result;
	}

	private List<Comments> getCommentsInOrder(Comments comment) {
		List<Comments> result = new ArrayList<>();
		result.add(comment);

		for (Comments reply : comment.getReplyComments()) {
			result.addAll(getCommentsInOrder(reply));
		}
		return result;
	}

	// ----- 댓글 좋아요한 멤버 가져오기
	public List<Long> findCommentsLikedMembers(Long commentsId, LikeStatus likeStatus){
		return commentsLikeRepository.findMemberIdsByCommentsIdAndLikeStatus(commentsId, likeStatus);
	}
}
