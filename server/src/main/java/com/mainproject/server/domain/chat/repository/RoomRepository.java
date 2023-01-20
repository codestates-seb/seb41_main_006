package com.mainproject.server.domain.chat.repository;

import com.mainproject.server.domain.chat.entity.ChatRoom;
import com.mainproject.server.domain.chat.entity.JoinChat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<ChatRoom, Long> {
    ChatRoom findByJoinChats(List<JoinChat> chats);
}
