package com.mainproject.server.domain.chat.service;

import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.chat.entity.ChatRoom;
import com.mainproject.server.domain.chat.entity.JoinChat;
import com.mainproject.server.domain.chat.redis.RedisSubscriber;
import com.mainproject.server.domain.chat.repository.RoomRepository;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoomService {
    private final MemberService memberService;
    private final RoomRepository roomRepository;
    private final Map<String, ChannelTopic> topics; // 채팅방의 메세지를 발행하기 위한 redis topic 정보
    private final RedisMessageListenerContainer redisMessageListenerContainer;
    private final RedisSubscriber redisSubscriber;

    public long createRoom(long receiverId, MemberDetails memberDetails) {

        Member receiver = memberService.validateVerifyMember(receiverId);
        Member sender = memberService.validateVerifyMember(memberDetails.getMemberId());

        // joinChat 객체에 해당 채팅방과 멤버 정보 저장...
        List<JoinChat> joinChats = new ArrayList<>();
        joinChats.add(JoinChat.builder().member(receiver).chatMessages(new ArrayList<>()).build());
        joinChats.add(JoinChat.builder().member(sender).chatMessages(new ArrayList<>()).build());

        // 새로운 채팅 방을 만들고 저장
        ChatRoom chatRoom = ChatRoom.builder()
                .joinChats(joinChats)
                .build();

        ChatRoom saveChatRoom = roomRepository.save(chatRoom);
        // 레디스에 새로운 토픽(채팅방 아이디) 생성하기
        String roomId = "room" + saveChatRoom.getChatRoomId();

        log.info("토픽 확인 topics : {}", topics);

        if(!topics.containsKey(roomId)) {
            // 토픽 생성
            ChannelTopic topic = new ChannelTopic(roomId);
            log.info("토픽 생성 : {}", topic);

            // 메세지 리스너 컨테이너에 메세지 리스너(redisSubscriber)와, 생성한 토픽 추가
            redisMessageListenerContainer.addMessageListener(redisSubscriber, topic);
            topics.put(roomId, topic);

            log.info("토픽 저장 topics: {}", topics);
        }
        // return 해야 할 값 : 생성될 채팅방의 URI?
        return saveChatRoom.getChatRoomId();
    }

    // sender-receiver의 채팅방 가져오기
    public ChatRoom findChatRoom(long receiverId, long senderId) {
        List<ChatRoom> chatRooms = findChatRooms(senderId);
        return null;
    }
    // sender의 채팅 목록 가져오기
    public List<ChatRoom> findChatRooms(long senderId) {
        Member sender = memberService.validateVerifyMember(senderId);

        List<ChatRoom> chatRooms = roomRepository.findAllById(sender.getJoinChats()
                .stream()
                .map(joinChat -> joinChat.getChatRoom().getChatRoomId())
                .collect(Collectors.toList()));

        return chatRooms;
    }

}
