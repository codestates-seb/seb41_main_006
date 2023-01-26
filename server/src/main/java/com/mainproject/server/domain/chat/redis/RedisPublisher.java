package com.mainproject.server.domain.chat.redis;

import com.mainproject.server.domain.chat.entity.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisPublisher {

    @Resource(name = "chatRedisTemplate")
    private final RedisTemplate<String, Object> redisTemplate;

    public void publish(ChannelTopic topic, ChatMessage message) {
        redisTemplate.convertAndSend(topic.getTopic(), message);
        log.info("레디스로 메세지 publish");
    }
}
