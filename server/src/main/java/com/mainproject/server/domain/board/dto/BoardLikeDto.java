package com.mainproject.server.domain.board.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import lombok.Getter;

@Getter
public class BoardLikeDto {

	@Positive @NotNull
	private Long memberId;
}
