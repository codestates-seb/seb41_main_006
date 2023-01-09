package com.mainproject.server.domain.board.mapper;

import com.mainproject.server.domain.board.dto.BoardDto;
import com.mainproject.server.domain.board.entity.Board;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BoardMapper {
    Board boardPostDtoToPost (BoardDto.Post postPostDto);
    Board boardPatchDtoToPost (BoardDto.Patch postPatchDto);
    BoardDto.Response boardToPostResponseDto (Board board);
    List<BoardDto.Response> boardsToPostResponseDtos(List<Board> boards);
}
