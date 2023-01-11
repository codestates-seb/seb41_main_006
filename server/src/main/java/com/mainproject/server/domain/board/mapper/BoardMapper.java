package com.mainproject.server.domain.board.mapper;

import com.mainproject.server.domain.board.dto.BoardDto;
import com.mainproject.server.domain.board.dto.BoardLikeDto;
import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.board.entity.BoardLike;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BoardMapper {
    Board boardPostDtoToPost (BoardDto.Post postPostDto);
    Board boardPatchDtoToPost (BoardDto.Patch postPatchDto);
    BoardDto.Response boardToPostResponseDto (Board board);
    List<BoardDto.Response> boardsToPostResponseDtos(List<Board> boards);

    BoardLike boardLikeDtoToBoardLike(BoardLikeDto boardLikeDto);
}
