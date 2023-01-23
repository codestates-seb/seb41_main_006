package com.mainproject.server.domain.chat.service;

import com.mainproject.server.domain.chat.dto.MessageDto;
import com.mainproject.server.domain.chat.entity.ChatMessage;
import com.mainproject.server.domain.chat.entity.ChatRoom;
import com.mainproject.server.domain.chat.repository.MessageRepository;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    private final MemberService memberService;
    private final RoomService roomService;
    private final MessageRepository messageRepository;

    public ChatMessage createMessage(MessageDto dto, long roomId) {
        Member member = memberService.validateVerifyMember(dto.getMemberId());
        ChatRoom chatRoom = roomService.findRoom(roomId);

        ChatMessage chatMessage = ChatMessage
                .builder()
                .content(dto.getContent())
                .sender(member)
                .chatRoom(chatRoom)
                .sendTime(LocalDateTime.now())
                .build();

        chatRoom.addMessage(chatMessage);
        log.info("채팅방에 메세지 추가");

        return chatMessage;
    }

    public void saveMessage(ChatMessage chatMessage) {
        messageRepository.save(chatMessage);
        log.info("메세지 저장 완료");
    }
}
