package com.mainproject.server.domain.board.mapper;

import com.mainproject.server.domain.board.dto.BoardDto;
import com.mainproject.server.domain.board.dto.BoardLikeDto;
import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.board.entity.BoardLike;
import com.mainproject.server.domain.comments.dto.CommentsDto;
import com.mainproject.server.domain.comments.entity.Comments;
import com.mainproject.server.domain.member.dto.MemberDto;
import com.mainproject.server.domain.member.entity.Member;

import com.mainproject.server.domain.pet.dto.PetDto;
import com.mainproject.server.domain.pet.entity.Pet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.Optional;

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
        board.setPlaceCode( postPostDto.getPlaceCode() );
        board.setX(postPostDto.getX());
        board.setY(postPostDto.getY());
        board.setPet(postToPet(postPostDto));
        board.setBoardStatus(Board.BoardStatus.BOARD_OPEN);
        board.setCountLike(0);

        return board;
    }

    default Pet postToPet(BoardDto.Post post) {
        if(post == null) {
            return null;
        }
        Pet pet = new Pet();
        pet.setPetId(post.getPetId());
        return pet;
    }
    default Board boardPatchDtoToPost(BoardDto.Patch postPatchDto) {
        if ( postPatchDto == null ) {
            return null;
        }

        Board board = new Board();

        board.setTitle( postPatchDto.getTitle() );
        board.setContent( postPatchDto.getContent() );
        board.setAppointTime( postPatchDto.getAppointTime() );
        board.setPlaceCode( postPatchDto.getPlaceCode() );
        board.setPet(patchToPet(postPatchDto));

        return board;
    }

    default Pet patchToPet(BoardDto.Patch patch) {
        if(patch == null) {
            return null;
        }
        Pet pet = new Pet();
        pet.setPetId(patch.getPetId());
        return pet;
    }

    @Mapping(source = "member.memberId", target = "memberId")
    default BoardDto.Response boardToBoardResponseDto(Board board){
        List<Comments> comments= board.getCommentList();
        Pet pet = board.getPet();

        BoardDto.Response boardResponseDto = BoardDto.Response
                .builder()
                .boardId(board.getBoardId())
                .member(memberToSimpleResponseDto(board.getMember()))
                .title(board.getTitle())
                .content(board.getContent())
                .countLike(board.getCountLike())
                .appointTime(board.getAppointTime())
                .placeCode(board.getPlaceCode())
                .x(board.getX())
                .y(board.getY())
                .pet(petToPetResponseWithoutMemberDto(pet))
                .boardStatus(board.getBoardStatus())
                .createdAt(board.getCreatedAt())
                .modifiedAt(board.getModifiedAt())
                .comments(commentsToCommentsResponseDtos(comments))
                .build();

        return boardResponseDto;
    }

    @Mapping(source = "member.memberId", target = "memberId")
    default BoardDto.Response boardToBoardResponseDtoWithLikedMembers(Board board, List<Long> likedMembers){
        List<Comments> comments= board.getCommentList();
        Pet pet = board.getPet();

        BoardDto.Response boardResponseDto = BoardDto.Response
            .builder()
            .boardId(board.getBoardId())
            .member(memberToSimpleResponseDto(board.getMember()))
            .title(board.getTitle())
            .content(board.getContent())
            .countLike(board.getCountLike())
            .appointTime(board.getAppointTime())
            .placeCode(board.getPlaceCode())
            .x(board.getX())
            .y(board.getY())
            .pet(petToPetResponseWithoutMemberDto(pet))
            .boardStatus(board.getBoardStatus())
            .createdAt(board.getCreatedAt())
            .modifiedAt(board.getModifiedAt())
            .comments(commentsToCommentsResponseDtos(comments))
            .likedMembers(likedMembers)
            .build();

        return boardResponseDto;
    }

    List<BoardDto.Response> boardsToPostResponseDtos(List<Board> boards);

    // ----- Comments
    List<CommentsDto.Response> commentsToCommentsResponseDtos(List<Comments> comments);

    @Mapping(source = "s3UpFile.upFileId", target = "profileImage.upFileId")
    @Mapping(source = "s3UpFile.upFileName", target = "profileImage.upFileName")
    @Mapping(source = "s3UpFile.upFileUrl", target = "profileImage.upFileUrl")
    PetDto.SimpleResponse petToPetResponseWithoutMemberDto(Pet pet);
    @Mapping(source = "s3UpFile.upFileId", target = "profileImage.upFileId")
    @Mapping(source = "s3UpFile.upFileName", target = "profileImage.upFileName")
    @Mapping(source = "s3UpFile.upFileUrl", target = "profileImage.upFileUrl")
    MemberDto.SimpleResponse memberToSimpleResponseDto(Member member);
    @Mapping(source = "s3UpFile.upFileId", target = "profileImage.upFileId")
    @Mapping(source = "s3UpFile.upFileName", target = "profileImage.upFileName")
    @Mapping(source = "s3UpFile.upFileUrl", target = "profileImage.upFileUrl")
    MemberDto.ResponseOnlyMemberName memberToMemberNameDto(Member member);

    @Mappings({@Mapping(source = "board.boardId", target = "boardId"),
    @Mapping(source = "parentComments.commentsId", target = "parentId"),
    @Mapping(source = "member", target = "member")})
    CommentsDto.Response commentsToCommentsResponseDto(Comments comments);
    // ------------------------

    BoardLike boardLikeDtoToBoardLike(BoardLikeDto boardLikeDto);

    BoardDto.NoneMemberResponse boardToNoneMemberResponseDto(Board board);

    List<BoardDto.NoneMemberResponse> boardsToNoneMemberResponseDtos(List<Board> boards);

    default BoardLikeDto.Response boardLikeToBoardLikeResponseDto(Optional<BoardLike> boardLike){
        Member member = boardLike.get().getMember();
        Board board = boardLike.get().getBoard();

        BoardLikeDto.Response boardLikeResponseDto = BoardLikeDto.Response
            .builder()
            .boardLikeId(boardLike.get().getBoardLikeId())
            .memberId(member.getMemberId())
            .boardId(board.getBoardId())
            .likeStatus(boardLike.get().likeStatus)
            .build();

        return boardLikeResponseDto;
    }
}
