package com.mainproject.server.domain.chat.redis;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.server.domain.chat.entity.ChatMessage;
import com.mainproject.server.domain.chat.entity.PublishMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
@RequiredArgsConstructor
public class RedisSubscriber{
    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations messagingTemplate;

    public void sendMessage(String message) {
        try {
            log.info("publish 전 message: {}", message);
            PublishMessage publishMessage = objectMapper.readValue(message, PublishMessage.class);
            messagingTemplate.convertAndSend("/sub/chats/" + publishMessage.getRoomId(), publishMessage);
            log.info("publish 전 message: {}", publishMessage.getContent());
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

}
