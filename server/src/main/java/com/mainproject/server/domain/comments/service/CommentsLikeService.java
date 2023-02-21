package com.mainproject.server.domain.comments.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mainproject.server.domain.board.entity.BoardLike;
import com.mainproject.server.domain.comments.entity.Comments;
import com.mainproject.server.domain.comments.entity.CommentsLike;
import com.mainproject.server.domain.comments.repository.CommentsLikeRepository;
import com.mainproject.server.domain.comments.repository.CommentsRepository;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import com.mainproject.server.domain.LikeStatus;

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
	public Optional<CommentsLike> likeComments(Long commentsId, Long memberId) {
		// 멤버, 댓글 검증
		Member findMember = memberService.validateVerifyMember(memberId);
		Comments findComments = commentsService.findVerifiedComments(commentsId);

		//LIKE 눌린 기록 있으면 - likeStatus를 CANCEL로,
		//               없다면 - likeStatus를 LIKE로
		Optional<CommentsLike> oCommentsLike = commentsLikeRepository.findByMemberAndComments(findMember, findComments);
		return Optional.of(oCommentsLike.map(like -> {
			if (like.getLikeStatus().equals(LikeStatus.LIKE)) {
				like.setLikeStatus(LikeStatus.CANCEL);
			} else {
				like.setLikeStatus(LikeStatus.LIKE);
			}
			return like;
		}).orElseGet(() -> {
			CommentsLike commentsLike = new CommentsLike();
			commentsLike.setMember(findMember);
			commentsLike.setComments(findComments);
			return commentsLikeRepository.save(commentsLike);
		}));
	}
}
