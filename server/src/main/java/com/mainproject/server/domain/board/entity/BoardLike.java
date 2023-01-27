package com.mainproject.server.domain.board.entity;

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
import com.mainproject.server.domain.LikeStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoardLike extends Auditable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long boardLikeId;

	// 좋아요 ~ 멤버 (N : 1)
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	// 좋아요 ~ 게시글 (N : 1)
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "board_id", nullable = false)
	private Board board;

	@Enumerated(EnumType.STRING)
	public LikeStatus likeStatus = LikeStatus.LIKE;

	public BoardLike(Long boardLikeId){
		this.boardLikeId = boardLikeId;
	}

}
