package com.mainproject.server.domain.board.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mainproject.server.domain.LikeStatus;
import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.board.entity.BoardLike;
import com.mainproject.server.domain.member.entity.Member;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {

	Optional<BoardLike> findByMemberAndBoard(Member member, Board board);

	@Query("SELECT bl.member.memberId FROM BoardLike bl WHERE bl.board.boardId = :boardId AND bl.likeStatus = :likeStatus")
	List<Long> findMemberIdsByBoardIdAndLikeStatus(@Param("boardId") Long boardId, @Param("likeStatus")LikeStatus likeStatus);
}
