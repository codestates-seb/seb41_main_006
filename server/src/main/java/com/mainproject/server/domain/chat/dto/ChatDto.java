package com.mainproject.server.domain.chat.dto;

import com.mainproject.server.domain.chat.entity.ChatMessage;
import com.mainproject.server.domain.chat.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class ChatDto {

    @Builder
    @Getter
    public static class Response {
        // 채팅방 id
        private long chatRoomId;
        // 채팅방 메세지 -> null 허용
        private List<ChatMessage> chatMessages;
        // 요청을 보낸 회원이 참가하고 있는 채팅방 목록
        private List<ChatRoom> chatRooms;
    }
}
