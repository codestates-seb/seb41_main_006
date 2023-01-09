package com.mainproject.server.domain.board.service;

import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.board.repository.BoardRepository;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public Board createBoard(Board board) {
        board.setCountLike(0);
        board.setBoardStatus(Board.BoardStatus.BOARD_FINDING);

        Board saveBoard = boardRepository.save(board);

       return saveBoard;
    }

    public Board updateBoard(Board board) {
       Board findBoard = findVerifiedBoard(board.getBoardId());

       Optional.ofNullable(board.getTitle())
               .ifPresent(findBoard::setTitle);

       Optional.ofNullable(board.getContent())
               .ifPresent(findBoard::setContent);

       Optional.ofNullable(board.getAppointTime())
               .ifPresent(findBoard::setAppointTime);

       Optional.ofNullable(board.getMeetingPlace())
               .ifPresent(findBoard::setMeetingPlace);

       Optional.ofNullable(board.getBoardStatus())
               .ifPresent(findBoard::setBoardStatus);

       return boardRepository.save(findBoard);
    }

    public Board findBoard(long boardId) {
        return findVerifiedBoard(boardId);
    }

    public Page<Board> findBoards(int page, int size) {
        Pageable pageable = PageRequest.of(page-1, size, Sort.by("boardId").descending());

        return boardRepository.findAll(pageable);
    }

    public Page<Board> searchBoard(int page, int size, String keyword) {
        Pageable pageable = PageRequest.of(page-1, size, Sort.by("boardId").descending());

        return boardRepository.findByTitleContaining(pageable, keyword);
    }

    public void deleteBoard(long boardId) {
        Board findBoard = findVerifiedBoard(boardId);
        boardRepository.delete(findBoard);
    }

    private Board findVerifiedBoard(long boardId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        Board findBoard = optionalBoard.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND)
        );
        return findBoard;
    }
}
