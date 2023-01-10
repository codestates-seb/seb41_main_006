package com.mainproject.server.domain.comments.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mainproject.server.audit.Auditable;
import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.member.entity.Member;

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

	@Column(length = 255, nullable = false)
	private String content;

	@Column
	private int countLike;

	@Column
	private int depth;

	@Column
	private int commentsOrder;

	// 댓글 ~ 회원 (N : 1)
	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	// 댓글 ~ 게시물 (N : 1)
	@ManyToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "board_id")
	private Board board;

	// 댓글 ~ 좋아요 (1 : N)
	@OneToMany(mappedBy = "comments", cascade = CascadeType.REMOVE)
	private List<CommentsLike> commentsLikes = new ArrayList<>();

	// 자기 참조 관계 : 댓글 ~ 대댓글 (1 : N)
	@ManyToOne
	@JoinColumn(name = "parent_id")
	private Comments parentComments;

	// 자기 참조 관계 : 대댓글 ~ 댓글 (N : 1)
	@OneToMany(mappedBy = "parentComments", cascade = CascadeType.REMOVE)
	private List<Comments> replies = new ArrayList<>();
}
