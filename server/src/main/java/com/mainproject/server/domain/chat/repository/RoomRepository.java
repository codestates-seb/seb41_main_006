package com.mainproject.server.domain.chat.repository;

import com.mainproject.server.domain.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<ChatRoom, Long> {

}
