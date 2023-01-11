package com.mainproject.server.domain.comments.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

import com.mainproject.server.domain.comments.dto.CommentsDto;
import com.mainproject.server.domain.comments.dto.CommentsLikeDto;
import com.mainproject.server.domain.comments.entity.Comments;
import com.mainproject.server.domain.comments.entity.CommentsLike;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentsMapper {

	@Mappings({@Mapping(source = "memberId", target = "member.memberId"),
	@Mapping(source = "boardId", target = "board.boardId")})
	Comments commentsPostDtoToComments(CommentsDto.Post commentsPostDto);

	Comments commentsPatchDtoToComments(CommentsDto.Patch commentsPatchDto);

	@Mappings({@Mapping(source = "member.memberId", target = "memberId"),
	@Mapping(source = "board.boardId", target = "boardId")})
	CommentsDto.Response commentsToCommentsResponseDto(Comments comments);

	CommentsLike commentsLikeDtoToCommentsLike(CommentsLikeDto commentsLikeDto);
}
