package com.mainproject.server.domain.comments.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.mainproject.server.audit.Auditable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Comments extends Auditable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long commentsId;

	@Column(length = 255)
	private String content;

	@Column
	private int countLike;

	@Column
	private int depth;

	@Column
	private int commentsOrder;

	//@ManyToOne
	//private Member member;

	//@ManyToOne
	//private Post post;

}
