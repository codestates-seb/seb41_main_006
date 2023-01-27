package com.mainproject.server.domain.board.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import com.mainproject.server.domain.LikeStatus;
import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.board.entity.BoardLike;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
public class BoardLikeDto {

	@Positive @NotNull
	private Long memberId;

	@Getter
	@Setter
	@Builder
	public static class Response{
		private Long boardLikeId;
		private Long memberId;
		private Long boardId;
		private LikeStatus likeStatus;
	}
}
