package com.mainproject.server.domain.chat.redis;

import com.mainproject.server.domain.chat.entity.JoinChat;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisPublisher { // 채팅방에 입장해 메세지를 작성하면 해당 메세지를 Redis Topic(채팅방)에 발행하는 기능의 서비스
    private final RedisTemplate<String, Object> redisTemplate;

    public void publish(ChannelTopic topic, JoinChat message) {
        redisTemplate.convertAndSend(topic.getTopic(), message);
        log.info("메세지를 Redis Topic 에 발행");
    }
}
