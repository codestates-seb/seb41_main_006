package com.mainproject.server.domain.comments.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.mainproject.server.global.auth.audit.Auditable;

@Entity
public class CommentsLike extends Auditable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long commentLikeId;

	@Column(nullable = false)
	private Long memberId;

	@Column(nullable = false)
	private Long commentsId;

	//@ManyToOne

}
