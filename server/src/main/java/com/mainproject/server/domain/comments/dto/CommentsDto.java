package com.mainproject.server.domain.comments.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class CommentsDto {
	@AllArgsConstructor
	@Getter
	@Setter
	public static class Post{

		@Positive
		private Long memberId;

		//@Positive
		//private Long postId;

		@NotBlank(message = "내용은 공백이 아니어야 합니다.")
		private String content;
	}

	/*@AllArgsConstructor
	@Getter
	public static class RePost{
		private Long commentsId;

		private Long postId;

		private Long memberId;

		private Long parentId;

		@NotBlank(message = "내용은 공백이 아니어야 합니다.")
		private String content;
	}*/


	@AllArgsConstructor
	@Getter
	public static class Patch{
		private Long commentsId;
		private String content;

		public void setCommentsId(Long commentsId){
			this.commentsId = commentsId;
		}
	}

	@AllArgsConstructor
	@Getter
	@Setter
	public static class Response{
		private Long commentsId;
		private Long postId;
		private Long memberId;
		private String content;
		private Long parentId;
		private int depth;
		private int commentsOrder;
		private int countLike;
	}
}
