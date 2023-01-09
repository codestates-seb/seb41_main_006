package com.mainproject.server.domain.comments.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mainproject.server.domain.comments.entity.Comments;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, Long> {

}
