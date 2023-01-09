package com.mainproject.server.domain.comments.mapper;

import org.mapstruct.Mapper;

import com.mainproject.server.domain.comments.dto.CommentsDto;
import com.mainproject.server.domain.comments.entity.Comments;

@Mapper(componentModel = "spring")
public interface CommentsMapper {

	Comments commentsPostDtoToComments(CommentsDto.Post commentsPostDto);
	Comments commentsPatchDtoToComments(CommentsDto.Patch commentsPatchDto);

	CommentsDto.Response commentsToCommentsResponseDto(Comments comments);
}
