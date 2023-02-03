package com.mainproject.server.domain.comments.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import com.mainproject.server.domain.LikeStatus;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
public class CommentsLikeDto {

	@Positive @NotNull
	private Long memberId;

	@Getter
	@Setter
	@Builder
	public static class Response{
		private Long commentsLikeId;
		private Long memberId;
		private Long commentsId;
		private LikeStatus likeStatus;
	}
}
