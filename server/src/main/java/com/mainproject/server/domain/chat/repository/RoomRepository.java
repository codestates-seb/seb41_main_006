package com.mainproject.server.domain.chat.repository;

import com.mainproject.server.domain.chat.entity.ChatRoom;
import com.mainproject.server.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findBySenderAndReceiver(Member sender, Member receiver);
    Page<ChatRoom> findAllBySenderOrReceiver(Pageable pageable, Member sender, Member receiver);
}
