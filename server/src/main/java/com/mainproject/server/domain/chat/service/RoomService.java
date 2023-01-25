package com.mainproject.server.domain.chat.service;

import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.chat.entity.ChatRoom;
import com.mainproject.server.domain.chat.repository.RoomRepository;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.response.PageInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoomService {
    private final MemberService memberService;
    private final RoomRepository roomRepository;
    @Resource(name = "redisTemplate")
    private HashOperations<String, Long, ChatRoom> opsHashChatRoom;
    private static final String CHAT_ROOMS = "CHAT_ROOM";

    public Long createRoom(long receiverId, MemberDetails memberDetails) {
        Member receiver = memberService.validateVerifyMember(receiverId);
        Member sender = memberService.validateVerifyMember(memberDetails.getMemberId());

        // 둘의 채팅이 있는 지 확인
        Optional<ChatRoom> optionalChatRoom = roomRepository.findBySenderAndReceiver(sender, receiver);
        Optional<ChatRoom> optionalChatRoom2 = roomRepository.findBySenderAndReceiver(receiver, sender);

        ChatRoom chatRoom = null;

        if(optionalChatRoom.isPresent()) {
            chatRoom = optionalChatRoom.get();
            log.info("find chat room");
            return chatRoom.getRoomId();
        } else if (optionalChatRoom2.isPresent()) {
            chatRoom = optionalChatRoom2.get();
            log.info("find chat room");
            return chatRoom.getRoomId();
        } else {
            chatRoom = ChatRoom.builder().sender(sender).receiver(receiver).build();
            log.info("create chat room");
        }

        ChatRoom saveChatRoom = roomRepository.save(chatRoom);

        // 생성된 채팅방을 redis hash에 저장하여 서버에 공유한다.
        opsHashChatRoom.put(CHAT_ROOMS, saveChatRoom.getRoomId(), saveChatRoom);
        log.info("redis 서버에 채팅방 공유");

        return saveChatRoom.getRoomId();
    }

    // 유저의 채팅 목록 가져오기
    public Page<ChatRoom> findRooms(MemberDetails memberDetails) {
        Member sender = memberService.validateVerifyMember(memberDetails.getMemberId());
        Pageable pageable = PageRequest.of(0, 10, Sort.by("roomId").descending());
        Page<ChatRoom> chatRooms = roomRepository.findAllBySenderOrReceiver(pageable, sender, sender);

        return chatRooms;
    }

    // 채팅방 하나 찾기
    public ChatRoom findRoom(long roomId) {
        ChatRoom chatRoom = findExistRoom(roomId);
        return chatRoom;
    }

    // 채팅방 존재 검증
    private ChatRoom findExistRoom(long roomId) {
        Optional<ChatRoom> optionalChatRoom = roomRepository.findById(roomId);

        ChatRoom findChatRoom = optionalChatRoom.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.CHATROOM_NOT_FOUND)
        );

        return findChatRoom;
    }
}
