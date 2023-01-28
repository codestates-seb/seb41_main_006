package com.mainproject.server.domain.board.controller;

import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.board.dto.BoardDto;
import com.mainproject.server.domain.board.dto.BoardLikeDto;
import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.board.entity.BoardLike;
import com.mainproject.server.domain.board.mapper.BoardMapper;
import com.mainproject.server.domain.board.service.BoardLikeService;
import com.mainproject.server.domain.board.service.BoardService;
import com.mainproject.server.dto.MultiResponseDto;
import com.mainproject.server.dto.SingleResponseDto;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.response.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/boards")
public class BoardController {
    private final BoardService boardService;
    private final BoardLikeService boardLikeService;
    private final BoardMapper mapper;

    @PostMapping
    public ResponseEntity postBoard(@Valid @RequestBody BoardDto.Post boardPostDto,
                                    @AuthenticationPrincipal MemberDetails memberDetails) {

        if(memberDetails == null) {
            return new ResponseEntity(ExceptionCode.NOT_AUTHORIZED,HttpStatus.UNAUTHORIZED);
        }

        Board board = boardService.createBoard(mapper.boardPostDtoToPost(boardPostDto), memberDetails);

        BoardDto.Response response = mapper.boardToBoardResponseDto(board);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);

    }

    @PatchMapping("/{board-id}")
    public ResponseEntity patchBoard(@Positive @PathVariable("board-id") long boardId,
                                     @Valid @RequestBody BoardDto.Patch boardPatchDto,
                                     @AuthenticationPrincipal MemberDetails memberDetails) {

        if(memberDetails == null) {
            return new ResponseEntity(ExceptionCode.NOT_AUTHORIZED,HttpStatus.UNAUTHORIZED);
        }

        Board updateBoard = boardService.updateBoard(boardId, boardPatchDto, memberDetails);

        BoardDto.Response response = mapper.boardToBoardResponseDto(updateBoard);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/my-boards")
    public ResponseEntity findMyBoard(@Positive @RequestParam(defaultValue = "1") int page,
                                      @Positive @RequestParam(defaultValue = "10") int size,
                                      @AuthenticationPrincipal MemberDetails memberDetails) {
        if(memberDetails == null) {
            return new ResponseEntity(ExceptionCode.NOT_AUTHORIZED,HttpStatus.UNAUTHORIZED);
        }

        Page<Board> boardPage = boardService.findMyBoards(page, size, memberDetails);
        PageInfo pageInfo = new PageInfo(page, size, (int)boardPage.getTotalElements(), boardPage.getTotalPages());

        List<Board> boardList = boardPage.getContent();
        List<BoardDto.NoneMemberResponse> responses = mapper.boardsToNoneMemberResponseDtos(boardList);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageInfo), HttpStatus.OK);
    }

    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@Positive @PathVariable("board-id") long boardId) {

        BoardDto.Response response = boardService.getBoardWithSortedCommentsAndReplies(boardId);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // search 값이 존재하면 검색된 값만 반환, search 값이 없으면 단순 목록 조회
    @GetMapping
    public ResponseEntity searchBoards(@Positive @RequestParam(defaultValue = "1") int page,
                                       @Positive @RequestParam(defaultValue = "10") int size,
                                       @RequestParam(value = "place-code") String keyword) { // 위치로 검색
        Page<Board> boardPage;

        if(keyword != null || !keyword.isEmpty()) {
            boardPage = boardService.searchBoard(page, size, keyword);
        } else {
            boardPage = boardService.findBoards(page, size);
        }

        PageInfo pageInfo = new PageInfo(page, size, (int) boardPage.getTotalElements(), boardPage.getTotalPages());

        List<Board> boardList = boardPage.getContent();
        List<BoardDto.Response> responses = mapper.boardsToPostResponseDtos(boardList);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageInfo), HttpStatus.OK);
    }

    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoard(@Positive @PathVariable("board-id") long boardId,
                                      @AuthenticationPrincipal MemberDetails memberDetails) {
        if(memberDetails == null) {
            return new ResponseEntity(ExceptionCode.NOT_AUTHORIZED,HttpStatus.UNAUTHORIZED);
        }

        boardService.deleteBoard(boardId, memberDetails);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{board-id}/like")
    public ResponseEntity likeBoard(@Positive @PathVariable("board-id") Long boardId,
                                    @Valid @RequestBody BoardLikeDto boardLikeDto,
                                    @AuthenticationPrincipal MemberDetails memberDetails){

        if(memberDetails == null){
            return new ResponseEntity(ExceptionCode.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        Optional<BoardLike> boardLike = boardLikeService.likeBoard(boardId, boardLikeDto.getMemberId());
        BoardLikeDto.Response response = mapper.boardLikeToBoardLikeResponseDto(boardLike);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
