package com.mainproject.server.domain.chat.controller;

import com.mainproject.server.auth.JwtTokenizer;
import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.chat.dto.ChatDto;
import com.mainproject.server.domain.chat.dto.MessageDto;
import com.mainproject.server.domain.chat.entity.ChatMessage;
import com.mainproject.server.domain.chat.entity.ChatRoom;
import com.mainproject.server.domain.chat.mapper.ChatMapper;
import com.mainproject.server.domain.chat.service.ChatService;
import com.mainproject.server.domain.chat.service.RoomService;
import com.mainproject.server.dto.MultiResponseDto;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.response.PageInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

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
    private final ChatMapper mapper;

    @MessageMapping("/messages/{room-id}")
    public ResponseEntity message(@DestinationVariable long roomId, MessageDto messageDto,
                                  @AuthenticationPrincipal MemberDetails memberDetails) {

        if(memberDetails == null) {
            log.error("인증되지 않은 회원의 접근으로 메세지를 전송할 수 없음");
            return new ResponseEntity<>(ExceptionCode.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        ChatMessage chatMessage = chatService.createMessage(messageDto, roomId);
        log.info("메세지 생성 완료");
        // 채팅방에 메세지 전송
        redisTemplate.convertAndSend(topic.getTopic(), chatMessage);
        log.info("레디스 서버에 메세지 전송 완료");
        // 전송 후 레포지토리에 저장할 것인지, 저장을 하지 않고 레디스 큐에 쌓인 데이터를 따로 일정 기간 주기마다 저장을 할 것인지
        chatService.saveMessage(chatMessage);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 채팅메세지 가져오기
    @GetMapping("/messages/{room-id}")
    public ResponseEntity getMessages(@Positive @PathVariable("room-id") long roomId,
                                      @AuthenticationPrincipal MemberDetails memberDetails) {

        if(memberDetails == null) {
            log.error("인증되지 않은 회원의 접근으로 메세지를 가져올 수 없음");
            return new ResponseEntity<>(ExceptionCode.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        // 해당 채팅방의 메세지를 가져와야 함
        Page<ChatMessage> messages = chatService.findMessages(roomId);
        PageInfo pageInfo = new PageInfo(1, 10, (int)messages.getTotalElements(), messages.getTotalPages());

        List<ChatMessage> messageList = messages.getContent();
        List<ChatDto.MessageResponse> messageResponses = mapper.messagesToMessageResponseDtos(messageList);

        return new ResponseEntity<>(new MultiResponseDto<>(messageResponses, pageInfo), HttpStatus.OK);
    }
}
