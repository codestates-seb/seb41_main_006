package com.mainproject.server.domain.chat.service;

import com.mainproject.server.domain.chat.dto.MessageDto;
import com.mainproject.server.domain.chat.entity.ChatMessage;
import com.mainproject.server.domain.chat.entity.ChatRoom;
import com.mainproject.server.domain.chat.repository.MessageRepository;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

        return chatMessage;
    }

    public void saveMessage(ChatMessage chatMessage) {
        messageRepository.save(chatMessage);
        log.info("메세지 저장 완료");
    }

    public Page<ChatMessage> findMessages(long roomId) {
        ChatRoom chatRoom = roomService.findRoom(roomId);

        Pageable pageable = PageRequest.of(0, 10, Sort.by("messageId").descending());
        Page<ChatMessage> messages = messageRepository.findByChatRoom(pageable, chatRoom);

        return messages;
    }
}
