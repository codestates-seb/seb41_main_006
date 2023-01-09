package com.mainproject.server.domain.board.controller;

import com.mainproject.server.domain.board.dto.BoardDto;
import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.board.mapper.BoardMapper;
import com.mainproject.server.domain.board.service.BoardService;
import com.mainproject.server.dto.MultiResponseDto;
import com.mainproject.server.dto.SingleResponseDto;
import com.mainproject.server.response.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/boards")
public class BoardController {
    private final BoardService boardService;
    private final BoardMapper mapper;

    @PostMapping
    public ResponseEntity postBoard(@Valid @RequestBody BoardDto.Post boardPostDto) {
        Board board = boardService.createBoard(mapper.boardPostDtoToPost(boardPostDto));
        BoardDto.Response response = mapper.boardToPostResponseDto(board);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{board-id}")
    public ResponseEntity patchBoard(@Positive @PathVariable("board-id") long boardId,
                                     @Valid @RequestBody BoardDto.Patch boardPatchDto) {
        Board board = mapper.boardPatchDtoToPost(boardPatchDto);
        board.setBoardId(boardId);
        Board updateBoard = boardService.updateBoard(board);

        BoardDto.Response response = mapper.boardToPostResponseDto(updateBoard);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@Positive @PathVariable("board-id") long boardId) {
        Board findBoard = boardService.findBoard(boardId);
        BoardDto.Response response = mapper.boardToPostResponseDto(findBoard);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getBoards(@Positive @RequestParam(defaultValue = "1") int page,
                                    @Positive @RequestParam(defaultValue = "10") int size) {
        Page<Board> boardPage = boardService.findBoards(page, size);
        PageInfo pageInfo = new PageInfo(page, size, (int) boardPage.getTotalElements(), boardPage.getTotalPages());

        List<Board> boardList = boardPage.getContent();
        List<BoardDto.Response> responses = mapper.boardsToPostResponseDtos(boardList);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageInfo), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity searchBoards(@Positive @RequestParam(defaultValue = "1") int page,
                                       @Positive @RequestParam(defaultValue = "10") int size,
                                       @RequestParam(value = "keyword") String keyword) {
        Page<Board> boardPage;

        if(keyword != null) {
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
    public ResponseEntity deleteBoard(@Positive @PathVariable("board-id") long boardId) {
        boardService.deleteBoard(boardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
