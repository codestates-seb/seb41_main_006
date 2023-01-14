package com.mainproject.server.domain.comments.controller;

import java.util.Objects;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mainproject.server.domain.comments.dto.CommentsDto;
import com.mainproject.server.domain.comments.dto.CommentsLikeDto;
import com.mainproject.server.domain.comments.entity.Comments;
import com.mainproject.server.domain.comments.entity.CommentsLike;
import com.mainproject.server.domain.comments.mapper.CommentsMapper;
import com.mainproject.server.domain.comments.service.CommentsLikeService;
import com.mainproject.server.domain.comments.service.CommentsService;
import com.mainproject.server.domain.member.entity.Member;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/comments")
public class CommentsController {

	private final CommentsService commentsService;
	private final CommentsLikeService commentsLikeService;
	private final CommentsMapper mapper;


	// ----- 댓글 등록
	@PostMapping
	public ResponseEntity postComments(@Valid @RequestBody CommentsDto.Post commentsPostDto){

		Comments createdComments = commentsService.createComments(mapper.commentsPostDtoToComments(commentsPostDto));

		CommentsDto.Response response = mapper.commentsToCommentsResponseDto(createdComments);

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	// ----- 대댓글 등록
	@PostMapping("/{parent-id}")
	public ResponseEntity postReplyComments(@Positive @PathVariable("parent-id") Long parentId,
											@Valid @RequestBody CommentsDto.Post commentsPostDto){

		Comments createdComments = commentsService.createReComments(parentId, mapper.commentsPostDtoToComments(commentsPostDto));

		CommentsDto.Response response = mapper.commentsToCommentsResponseDto(createdComments);

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}



	// ----- 댓글 수정
	@PatchMapping("/{comments-id}")
	public ResponseEntity patchComments(@Positive @PathVariable("comments-id") Long commentsId,
										@Valid @RequestBody CommentsDto.Patch commentsPatchDto){

		commentsPatchDto.setCommentsId(commentsId);
		Comments comments = commentsService.updateComments(mapper.commentsPatchDtoToComments(commentsPatchDto));

		CommentsDto.Response response = mapper.commentsToCommentsResponseDto(comments);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// ----- 댓글 삭제
	@DeleteMapping("/{comments-id}")
	public ResponseEntity deleteComments(@Positive @PathVariable("comments-id") Long commentsId){

		commentsService.deleteComments(commentsId);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	// ----- 댓글 좋아요
	@PutMapping("/{comments-id}/like")
	public ResponseEntity likeComments(@Positive @PathVariable("comments-id") Long commentsId,
										@Valid @RequestBody CommentsLikeDto commentsLikeDto)
	{
		commentsLikeService.likeComments(commentsId, commentsLikeDto.getMemberId());

		return new ResponseEntity<>(HttpStatus.OK);
	}
}


