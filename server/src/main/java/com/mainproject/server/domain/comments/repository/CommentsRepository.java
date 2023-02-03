package com.mainproject.server.domain.comments.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.comments.entity.Comments;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, Long> {

	//COALESCE : (1)c.parentComments.commentsId 가 Null 일 경우 (2)c.commentsId 리턴
	@Query("SELECT c FROM Comments c WHERE c.board = :board ORDER BY c.createdAt ASC, COALESCE(c.parentComments.commentsId, c.commentsId)")
	List<Comments> findAllByBoardOrderByCreatedAtAscParentCommentsCommentsId(@Param("board") Board board);

}
