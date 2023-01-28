package com.mainproject.server.domain.comments.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mainproject.server.domain.LikeStatus;
import com.mainproject.server.domain.comments.entity.Comments;
import com.mainproject.server.domain.comments.entity.CommentsLike;
import com.mainproject.server.domain.member.entity.Member;

@Repository
public interface CommentsLikeRepository extends JpaRepository<CommentsLike, Long> {

	//CommentsLike findByMemberAndComments(Member member, Comments comments);

	Optional<CommentsLike> findByMemberAndComments(Member member, Comments comments);

	@Query("SELECT cl.member.memberId FROM CommentsLike cl WHERE cl.comments.commentsId = :commentsId AND cl.likeStatus = :likeStatus")
	List<Long> findMemberIdsByCommentsIdAndLikeStatus(@Param("commentsId") Long commentsId, @Param("likeStatus") LikeStatus likeStatus);
}
