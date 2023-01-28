package com.mainproject.server.domain.board.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.board.entity.BoardLike;
import com.mainproject.server.domain.board.mapper.BoardMapper;
import com.mainproject.server.domain.board.repository.BoardLikeRepository;
import com.mainproject.server.domain.board.repository.BoardRepository;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import com.mainproject.server.domain.LikeStatus;

@Service
public class BoardLikeService {

	private final MemberService memberService;
	private final BoardService boardService;
	private final BoardRepository boardRepository;
	private final BoardLikeRepository boardLikeRepository;
	private final BoardMapper boardMapper;

	public BoardLikeService(MemberService memberService, BoardService boardService, BoardRepository boardRepository,
		BoardLikeRepository boardLikeRepository, BoardMapper boardMapper) {
		this.memberService = memberService;
		this.boardService = boardService;
		this.boardRepository = boardRepository;
		this.boardLikeRepository = boardLikeRepository;
		this.boardMapper = boardMapper;
	}

	@Transactional
	public Optional<BoardLike> likeBoard(Long boardId, Long memberId){
		Member findMember = memberService.validateVerifyMember(memberId);
		Board findBoard = boardService.findVerifiedBoard(boardId);

		Optional<BoardLike> oBoardLike = boardLikeRepository.findByMemberAndBoard(findMember, findBoard);
		return Optional.of(oBoardLike.map(like -> {
			if (like.getLikeStatus().equals(LikeStatus.LIKE)) {
				like.setLikeStatus(LikeStatus.CANCEL);
			} else {
				like.setLikeStatus(LikeStatus.LIKE);
			}
			return like;
		}).orElseGet(() -> {
			BoardLike boardLike = new BoardLike();
			boardLike.setMember(findMember);
			boardLike.setBoard(findBoard);
			return boardLikeRepository.save(boardLike);
		}));
	}
}
