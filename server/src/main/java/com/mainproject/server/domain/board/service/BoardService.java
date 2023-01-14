package com.mainproject.server.domain.board.service;

import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.board.dto.BoardDto;
import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.board.mapper.BoardMapper;
import com.mainproject.server.domain.board.repository.BoardRepository;
import com.mainproject.server.domain.comments.entity.Comments;
import com.mainproject.server.domain.comments.repository.CommentsRepository;
import com.mainproject.server.domain.comments.service.CommentsService;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final BoardMapper boardMapper;
    private final MemberService memberService;
    private final CommentsService commentsService;


    public Board createBoard(Board board, MemberDetails memberDetails) {

        Member member = memberService.validateVerifyMember(memberDetails.getMemberId());
        board.setMember(member);

        return boardRepository.save(board);
    }

    public Board updateBoard(Board board, MemberDetails memberDetails) {

       Board findBoard = findVerifiedBoard(board.getBoardId());

       validateBoardWriter(findBoard, memberDetails.getMemberId());

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

    // ----- 특정 게시글 조회 (댓글, 대댓글 함께)
    @Transactional(readOnly = true)
    public BoardDto.Response getBoardWithSortedCommentsAndReplies(Long boardId){
        Board findBoard = findVerifiedBoard(boardId);
        findBoard.setCommentList(commentsService.getSortedCommentsByBoard(findBoard));

        return boardMapper.boardToBoardResponseDto(findBoard);
    }

    @Transactional(readOnly = true)
    public Page<Board> findBoards(int page, int size) {
        Pageable pageable = PageRequest.of(page-1, size, Sort.by("boardId").descending());

        return boardRepository.findAll(pageable);
    }

    public Page<Board> searchBoard(int page, int size, String keyword) {
        Pageable pageable = PageRequest.of(page-1, size, Sort.by("boardId").descending());

        return boardRepository.findByMeetingPlaceContaining(pageable, keyword);
    }

    public void deleteBoard(Long boardId, MemberDetails memberDetails) {
        Board findBoard = findVerifiedBoard(boardId);

        validateBoardWriter(findBoard, memberDetails.getMemberId());

        boardRepository.delete(findBoard);
    }

    public Board findVerifiedBoard(Long boardId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        Board findBoard = optionalBoard.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND)
        );
        return findBoard;
    }

    public void validateBoardWriter(Board board, long memberId) {

        Member member = memberService.validateVerifyMember(memberId);

        if(board.getMember() != member) {
            throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);
        }
    }
}
