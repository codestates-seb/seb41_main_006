package com.mainproject.server.domain.comments.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Formula;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
	@Formula("(select count(*) from comments_like v where v.comments_id = comments_id and v.like_status = 'LIKE')")
	private int countLike;

	@Column
	private int depth;

	// 댓글 ~ 회원 (N : 1)
	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	// 댓글 ~ 게시물 (N : 1)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "board_id")
	private Board board;

	// 댓글 ~ 좋아요 (1 : N)
	@OneToMany(mappedBy = "comments", cascade = CascadeType.ALL)
	private List<CommentsLike> commentsLikes = new ArrayList<>();

	// 자기 참조 관계 : 댓글 ~ 대댓글 (1 : N)
	@ManyToOne
	@JoinColumn(name = "parent_id")
	private Comments parentComments;

	// 자기 참조 관계 : 대댓글 ~ 댓글 (N : 1)
	@OneToMany(mappedBy = "parentComments", orphanRemoval = true)
	@JsonBackReference
	private List<Comments> replyComments = new ArrayList<>();

	@ElementCollection
	@CollectionTable(name="comments_liked_members", joinColumns=@JoinColumn(name="comments_id"))
	@Column(name="member_id")
	private List<Long> likedMembers;

	public void setlikedMembers(List<Long> likedMembers) {
		this.likedMembers = likedMembers;
	}

}
