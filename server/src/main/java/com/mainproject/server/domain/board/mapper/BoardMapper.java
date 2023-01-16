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

    default Board boardPostDtoToPost (BoardDto.Post postPostDto) {
        if ( postPostDto == null ) {
            return null;
        }

        Board board = new Board();

        board.setTitle( postPostDto.getTitle() );
        board.setContent( postPostDto.getContent() );
        board.setAppointTime( postPostDto.getAppointTime() );
        board.setMeetingPlace( postPostDto.getMeetingPlace() );
        board.setBoardStatus(Board.BoardStatus.BOARD_OPEN);
        board.setCountLike(0);

        return board;
    }
    Board boardPatchDtoToPost (BoardDto.Patch postPatchDto);

    @Mapping(source = "member.memberId", target = "memberId")
    default BoardDto.Response boardToBoardResponseDto(Board board){
        List<Comments> comments= board.getCommentList();


        BoardDto.Response boardResponseDto = BoardDto.Response
                .builder()
                .boardId(board.getBoardId())
                .member(board.getMember())
                .title(board.getTitle())
                .content(board.getContent())
                .appointTime(board.getAppointTime())
                .meetingPlace(board.getMeetingPlace())
                .boardStatus(board.getBoardStatus())
                .createdAt(board.getCreatedAt())
                .modifiedAt(board.getModifiedAt())
                .comments(commentsToCommentsResponseDtos(comments))
                .build();

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