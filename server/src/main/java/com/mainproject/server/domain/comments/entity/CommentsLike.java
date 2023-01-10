package com.mainproject.server.domain.comments.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
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
@AllArgsConstructor
@NoArgsConstructor
public class CommentsLike extends Auditable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long commentLikeId;

	// 좋아요 ~ 멤버 (N : 1)
	@ManyToOne(cascade = CascadeType.DETACH)
	@JoinColumn(name = "member_id")
	private Member member;

	//좋아요 ~ 댓글 (N : 1)
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "comments_id")
	private Comments comments;

	public CommentsLike(Member member, Comments comments){
		this.member = member;
		this.comments = comments;
	}
}
