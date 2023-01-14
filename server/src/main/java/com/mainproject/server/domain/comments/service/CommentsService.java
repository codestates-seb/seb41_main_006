package com.mainproject.server.domain.comments.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mainproject.server.domain.comments.entity.Comments;
import com.mainproject.server.domain.comments.repository.CommentsRepository;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;

@Service
public class CommentsService {
	private final CommentsRepository commentsRepository;

	public CommentsService(CommentsRepository commentsRepository) {
		this.commentsRepository = commentsRepository;
	}
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
	public void deleteComments(Long commentId){
		Comments findComments = findVerifiedComments(commentId);

		commentsRepository.delete(findComments);
	}

	// ----- 댓글 검증
	public Comments findVerifiedComments(Long commentsId){
		Optional<Comments> optionalComments = commentsRepository.findById(commentsId);
		Comments findComments =
			optionalComments.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENTS_NOT_FOUND));

		return findComments;
	}
}
