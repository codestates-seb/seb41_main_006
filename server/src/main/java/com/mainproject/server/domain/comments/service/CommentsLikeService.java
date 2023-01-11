package com.mainproject.server.domain.comments.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mainproject.server.domain.comments.entity.Comments;
import com.mainproject.server.domain.comments.entity.CommentsLike;
import com.mainproject.server.domain.comments.repository.CommentsLikeRepository;
import com.mainproject.server.domain.comments.repository.CommentsRepository;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;

@Service
public class CommentsLikeService {

	private final MemberService memberService;
	private final CommentsService commentsService;
	private final CommentsRepository commentsRepository;
	private final CommentsLikeRepository commentsLikeRepository;

	public CommentsLikeService(MemberService memberService, CommentsService commentsService,
		CommentsRepository commentsRepository, CommentsLikeRepository commentsLikeRepository) {
		this.memberService = memberService;
		this.commentsService = commentsService;
		this.commentsRepository = commentsRepository;
		this.commentsLikeRepository = commentsLikeRepository;
	}

	// ----- 댓글 좋아요
	@Transactional
	public void likeComments(Long commentsId, Long memberId) {
		Member findMember = memberService.validateVerifyMember(memberId);
		Comments findComments = commentsService.findVerifiedComments(commentsId);

		Optional<CommentsLike> oCommentsLike = commentsLikeRepository.findByMemberAndComments(findMember, findComments);
		oCommentsLike.ifPresentOrElse(
			like -> {
				if (like.getLikeStatus().equals(CommentsLike.LikeStatus.LIKE)) {
					like.setLikeStatus(CommentsLike.LikeStatus.CANCEL);
				} else {
					like.setLikeStatus(CommentsLike.LikeStatus.LIKE);
				}
			},
			() -> {
				CommentsLike commentsLike = new CommentsLike();
				commentsLike.setMember(findMember);
				commentsLike.setComments(findComments);
				commentsLikeRepository.save(commentsLike);
			});
	}
}
