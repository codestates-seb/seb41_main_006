package com.mainproject.server.domain.chat.controller;

import com.mainproject.server.auth.JwtTokenizer;
import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.chat.dto.MessageDto;
import com.mainproject.server.domain.chat.entity.ChatMessage;
import com.mainproject.server.domain.chat.entity.ChatRoom;
import com.mainproject.server.domain.chat.service.ChatService;
import com.mainproject.server.domain.chat.service.RoomService;
import com.mainproject.server.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@Slf4j
@Validated
@RequestMapping("/chats")
@RequiredArgsConstructor
public class MessageController {
    private final JwtTokenizer jwtTokenizer;
    private final ChatService chatService;
    private final ChannelTopic topic;
    private final RedisTemplate redisTemplate;

    @MessageMapping("/{room-id}/message")
    public ResponseEntity message(@DestinationVariable long roomId,
                                  @Valid @RequestBody MessageDto messageDto,
                                  @AuthenticationPrincipal MemberDetails memberDetails,
                                  @Header("Authorization") String token) {

        if(!jwtTokenizer.validateToken(token)|| memberDetails == null) {
            return new ResponseEntity<>(ExceptionCode.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        ChatMessage chatMessage = chatService.createMessage(messageDto, roomId);

        // 채팅방에 메세지 전송
        redisTemplate.convertAndSend(topic.getTopic(), chatMessage);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
