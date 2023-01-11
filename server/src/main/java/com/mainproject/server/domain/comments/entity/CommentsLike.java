package com.mainproject.server.domain.comments.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.mainproject.server.audit.Auditable;
import com.mainproject.server.domain.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentsLike extends Auditable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long commentsLikeId;

	// 좋아요 ~ 멤버 (N : 1)
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	//좋아요 ~ 댓글 (N : 1)
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "comments_id", nullable = false)
	private Comments comments;

	@Enumerated(EnumType.STRING)
	private LikeStatus likeStatus = LikeStatus.LIKE;

	public enum LikeStatus {
		LIKE("등록"),
		CANCEL("취소");

		@Getter
		private String likeStatus;

		LikeStatus(String likeStatus) {
			this.likeStatus = likeStatus;
		}
	}
	public CommentsLike(Long commentsLikeId){
		this.commentsLikeId = commentsLikeId;
	}
}
