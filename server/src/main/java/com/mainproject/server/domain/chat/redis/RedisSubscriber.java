package com.mainproject.server.domain.chat.redis;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.server.domain.chat.entity.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class RedisSubscriber {
    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations messagingTemplate;

    // 레디스에서 메세지가 publish되면 대기하고 있던 redis subscriber가 메세지를 받아 처리
    public void sendMessage(String publishMessage) {
        try{
            // 레디스를 통해 들어온 메세지를 chatMessage로 변환
            ChatMessage chatMessage = objectMapper.readValue(publishMessage, ChatMessage.class);
            // 채팅방을 구독하고 있는 회원에게 해당 메세지를 뿌림
            messagingTemplate.convertAndSend("/sub/chats/" + chatMessage.getChatRoom().getRoomId(), chatMessage);
        } catch (Exception e) {
            log.error("Exception in redis Subscriber:{}", e);
        }
    }
}
