package com.mainproject.server.domain.comments.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import lombok.Getter;

@Getter
public class CommentsLikeDto {

	@Positive @NotNull
	private Long memberId;

}
