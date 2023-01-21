package com.mainproject.server.domain.chat.service;

import com.mainproject.server.domain.chat.dto.MessageDto;
import com.mainproject.server.domain.chat.entity.ChatMessage;
import com.mainproject.server.domain.chat.entity.ChatRoom;
import com.mainproject.server.domain.chat.repository.MessageRepository;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
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

        return messageRepository.save(chatMessage);
    }
}
