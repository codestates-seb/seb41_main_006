package com.mainproject.server.domain.board.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.board.entity.BoardLike;
import com.mainproject.server.domain.member.entity.Member;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {

	Optional<BoardLike> findByMemberAndBoard(Member member, Board board);
}
