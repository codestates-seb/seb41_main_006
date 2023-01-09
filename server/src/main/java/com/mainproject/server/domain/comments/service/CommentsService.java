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

		Comments createdComments = commentsRepository.save(comments);

		// 댓글 저장
		return createdComments;
	}

	// ----- 대댓글 등록
	public Comments createReComments(){
		return null;
	}

	// ----- 댓글 수정
	public Comments updateComments(Comments comments){
		//유효한 댓글인지 검증
		Comments findComments = findVerifiedComments(comments.getCommentsId());

		// 수정
		Optional.ofNullable(comments.getContent())
			.ifPresent(content -> findComments.setContent(content));

		// 수정 뒤 저장
		return commentsRepository.save(findComments);
	}

	// ----- 댓글 삭제
	public void deleteComments(Long commentId){
		Comments findComments = findVerifiedComments(commentId);

		commentsRepository.delete(findComments);
	}

	// ----- 댓글 검증
	private Comments findVerifiedComments(Long commentsId){
		Optional<Comments> optionalComments = commentsRepository.findById(commentsId);
		Comments findComments =
			optionalComments.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENTS_NOT_FOUND));

		return findComments;
	}
}
