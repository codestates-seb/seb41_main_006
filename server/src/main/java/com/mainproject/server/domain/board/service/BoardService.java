package com.mainproject.server.domain.board.service;

import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.LikeStatus;
import com.mainproject.server.domain.board.dto.BoardDto;
import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.board.mapper.BoardMapper;
import com.mainproject.server.domain.board.repository.BoardLikeRepository;
import com.mainproject.server.domain.board.repository.BoardRepository;
import com.mainproject.server.domain.comments.entity.Comments;
import com.mainproject.server.domain.comments.service.CommentsService;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import com.mainproject.server.domain.pet.entity.Pet;
import com.mainproject.server.domain.pet.service.PetService;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.utils.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final BoardMapper boardMapper;
    private final MemberService memberService;
    private final CommentsService commentsService;
    private final PetService petService;
    private final CustomBeanUtils customBeanUtils;
    private final BoardLikeRepository boardLikeRepository;


    public Board createBoard(Board board, MemberDetails memberDetails) {

        Member member = memberService.validateVerifyMember(memberDetails.getMemberId());
        Pet pet = petService.findPet(board.getPet().getPetId());

        board.setMember(member);
        board.setPet(pet);

        return boardRepository.save(board);
    }

    public Board updateBoard(long boardId, BoardDto.Patch patch, MemberDetails memberDetails) {

       Board findBoard = findVerifiedBoard(boardId);

       validateBoardWriter(findBoard, memberDetails.getMemberId());

       Board updateBoard = (Board) customBeanUtils.copyNonNullProperties(patch, findBoard);

       return boardRepository.save(updateBoard);
    }

    // ----- 특정 게시글 조회 (댓글, 대댓글 함께)
    @Transactional(readOnly = true)
    public BoardDto.Response getBoardWithSortedCommentsAndReplies(Long boardId){
        Board findBoard = findVerifiedBoard(boardId);
        findBoard.setCommentList(commentsService.getSortedCommentsByBoard(findBoard));

        List<Long> likedMembers = boardLikeRepository.findMemberIdsByBoardIdAndLikeStatus(boardId, LikeStatus.LIKE);

        for(Comments comments : findBoard.getCommentList()){
            List<Long> likedCommentMembers = commentsService.findCommentsLikedMembers(comments.getCommentsId(), LikeStatus.LIKE);
            comments.setlikedMembers(likedCommentMembers);
        }

        BoardDto.Response response = boardMapper.boardToBoardResponseDtoWithLikedMembers(findBoard, likedMembers);
        response.setLikedMembers(likedMembers);

        return response;
    }

    @Transactional(readOnly = true)
    public Page<Board> findBoards(int page, int size) {
        Pageable pageable = PageRequest.of(page-1, size, Sort.by("boardId").descending());

        return boardRepository.findAll(pageable);
    }

    public Page<Board> searchBoard(int page, int size, String keyword) {
        Pageable pageable = PageRequest.of(page-1, size, Sort.by("boardId").descending());

        return boardRepository.findByPlaceCodeContaining(pageable, keyword);
    }

    public Page<Board> findMyBoards(int page, int size, MemberDetails memberDetails) {
        Pageable pageable = PageRequest.of(page-1, size, Sort.by("boardId").descending());
        Member member = memberService.validateVerifyMember(memberDetails.getMemberId());

        Page<Board> boardPage = boardRepository.findByMember(pageable, member);

        return boardPage;
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
