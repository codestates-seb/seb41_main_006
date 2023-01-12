package com.mainproject.server.domain.board.mapper;

import com.mainproject.server.domain.board.dto.BoardDto;
import com.mainproject.server.domain.board.dto.BoardLikeDto;
import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.board.entity.BoardLike;
import com.mainproject.server.domain.comments.dto.CommentsDto;
import com.mainproject.server.domain.comments.entity.Comments;
import com.mainproject.server.domain.comments.mapper.CommentsMapper;
import com.mainproject.server.domain.member.entity.Member;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BoardMapper {

    Board boardPostDtoToPost (BoardDto.Post postPostDto);
    Board boardPatchDtoToPost (BoardDto.Patch postPatchDto);

    @Mapping(source = "member.memberId", target = "memberId")
    default BoardDto.Response boardToBoardResponseDto(Board board){

        BoardDto.Response boardResponseDto = new BoardDto.Response();

        boardResponseDto.setBoardId(board.getBoardId());
        boardResponseDto.setMember(board.getMember());
        boardResponseDto.setTitle(board.getTitle());
        boardResponseDto.setContent(board.getContent());
        boardResponseDto.setAppointTime(board.getAppointTime());
        boardResponseDto.setMeetingPlace(board.getMeetingPlace());
        boardResponseDto.setBoardStatus(board.getBoardStatus());
        boardResponseDto.setCreatedAt(board.getCreatedAt());
        boardResponseDto.setModifiedAt(board.getModifiedAt());

        List<Comments> comments= board.getCommentList();
        boardResponseDto.setComments(commentsToCommentsResponseDtos(comments));

        return boardResponseDto;
    }
    List<BoardDto.Response> boardsToPostResponseDtos(List<Board> boards);

    // ----- Comments
    List<CommentsDto.Response> commentsToCommentsResponseDtos(List<Comments> comments);

    @Mappings({@Mapping(source = "member.memberId", target = "memberId"),
        @Mapping(source = "board.boardId", target = "boardId"),
        @Mapping(source = "parentComments.commentsId", target = "parentId")})
    CommentsDto.Response commentsToCommentsResponseDto(Comments comments);
    // ------------------------

    BoardLike boardLikeDtoToBoardLike(BoardLikeDto boardLikeDto);

}
