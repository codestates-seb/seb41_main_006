package com.mainproject.server.domain.board.repository;

import com.mainproject.server.domain.board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findByMeetingPlaceContaining(Pageable pageable, String keyword);
}
