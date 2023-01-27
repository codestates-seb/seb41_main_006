package com.mainproject.server.domain.chat.service;

import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.chat.entity.ChatRoom;
import com.mainproject.server.domain.chat.redis.RedisSubscriber;
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
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoomService {
    private final MemberService memberService;
    private final RoomRepository roomRepository;
    private final Map<String, ChannelTopic> topics;
    private final RedisMessageListenerContainer redisMessageListener;
    private final RedisSubscriber redisSubscriber;

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
        String roomId = "room" + saveChatRoom.getRoomId();

        createTopic(roomId);

        return saveChatRoom.getRoomId();
    }

    // 유저의 채팅 목록 가져오기
    public Page<ChatRoom> findRooms(MemberDetails memberDetails, int page, int size) {
        Member sender = memberService.validateVerifyMember(memberDetails.getMemberId());
        Pageable pageable = PageRequest.of(0, 10, Sort.by("roomId").descending());
        Page<ChatRoom> chatRooms = roomRepository.findAllBySenderOrReceiver(pageable, sender, sender);

        return chatRooms;
    }

    // 채팅방 하나 찾기
    public ChatRoom findRoom(long roomId) {
        ChatRoom chatRoom = findExistRoom(roomId);

        String topicRoomId = "room" + chatRoom.getRoomId();

        createTopic(topicRoomId);

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

    private void createTopic(String topicRoomId) {

        log.info("저장 전 topics = {}", topics);

        if(!topics.containsKey(topicRoomId)) {
            log.info("토픽 생성");

            ChannelTopic topic = new ChannelTopic(topicRoomId);
            redisMessageListener.addMessageListener(redisSubscriber, topic);
            topics.put(topicRoomId, topic);

            log.info("토픽 저장");
        }

        log.info("저장 후 topics = {}", topics);
    }
}
