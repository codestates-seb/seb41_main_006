package com.mainproject.server.domain.chat.redis;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.server.domain.chat.entity.ChatMessage;
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
public class RedisSubscriber implements MessageListener {
    private final ObjectMapper objectMapper;
    @Resource(name = "chatRedisTemplate")
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            // 레디스를 통해 들어온 메세지를 chatMessage로 변환
            String publishMessage = String.valueOf(redisTemplate.getStringSerializer().deserialize(message.getBody()));
            ChatMessage chatMessage = objectMapper.readValue(publishMessage, ChatMessage.class);
            // 채팅방을 구독하고 있는 회원에게 해당 메세지를 뿌림
            messagingTemplate.convertAndSend("/sub/chats/" + chatMessage.getChatRoom().getRoomId(), chatMessage);
            log.info("redis publish messages");
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
