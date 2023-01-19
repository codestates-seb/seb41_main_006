package com.mainproject.server.domain.chat.service;

import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.chat.dto.ChatDto;
import com.mainproject.server.domain.chat.entity.ChatMessage;
import com.mainproject.server.domain.chat.entity.ChatRoom;
import com.mainproject.server.domain.chat.entity.JoinChat;
import com.mainproject.server.domain.chat.repository.RoomRepository;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    private final MemberService memberService;
    private final RoomService roomService;

    // 첫채팅인지 아닌지 판단하기
    public ChatDto.Response judgeFirstChat(long receiverId, MemberDetails memberDetails) {
        // 채팅을 할 자(receiver)의 상태가 탈퇴상태가 아닌지 확인
        verifyQuitMember(receiverId);
        // -> roomRepository에서 Chatroom 가져오기! 없으면 true, 있으면 false
        List<JoinChat> joinChats = findJoinChats(receiverId,memberDetails.getMemberId());

        if(joinChats.isEmpty()) {
            // 새로운 채팅방을 생성해야 함
            long chatRoomId = roomService.createRoom(receiverId, memberDetails);
            List<ChatRoom> chatRooms = roomService.findChatRooms(memberDetails.getMemberId());
            return null;
        } else {
            // 기존 채팅이 있다는 뜻 -> 기존 채팅방을 불러오고 기존 채팅 메세지를 불러와야 함
            return null;
        }
    }

    // sender의 채팅방 목록 + sender와 receiver의 채팅메세지 내역 -> joinChat?
    public List<ChatMessage> getChatMessage(long receiverId, MemberDetails memberDetails) {
        // sender의 joinchat 중에 receiver가 있는 chatroom찾기?
        List<JoinChat> joinChats = findJoinChats(receiverId, memberDetails.getMemberId());
        return null;
    }

    // 탈퇴회원인지 검증
    private Member verifyQuitMember(long memberId) {

        Member member = memberService.validateVerifyMember(memberId);

        if(member.getMemberStatus().equals(Member.MemberStatus.MEMBER_QUIT)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        return member;
    }

    // Joinchat 찾기
    private List<JoinChat> findJoinChats(long receiverId, long senderId) {
        Member receiver = verifyQuitMember(receiverId);
        Member sender = memberService.validateVerifyMember(senderId);

        List<ChatRoom> chatRooms = roomService.findChatRooms(senderId);

       // chatroom List에서 joinchat을 가져와서 해당 joinchat에 receiver 가 있는 지 확인
        List<JoinChat> joinChats = new ArrayList<>();

        for(ChatRoom chatRoom : chatRooms) {
            Optional<JoinChat> findJoinChat = chatRoom.getJoinChats()
                    .stream()
                    .filter(joinChat -> joinChat.getMember().equals(receiver))
                    .findAny();
            if(findJoinChat.isPresent()) {
                joinChats.add(findJoinChat.get());
            }
        }
        return joinChats;

    }
}
