package com.mainproject.server.domain.chat.redis;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.server.domain.chat.entity.JoinChat;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisSubscriber implements MessageListener {
    private final ObjectMapper mapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    // redis에서 메세지가 발행(publish)되면 대기하고 있던 onMessage가 해당 메세지를 받아 처리
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try{
            String publishMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            JoinChat joinChat = mapper.readValue(publishMessage, JoinChat.class);
            messagingTemplate.convertAndSend("/sub/chat/room/" + joinChat.getChatRoom().getChatRoomId(), joinChat);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
