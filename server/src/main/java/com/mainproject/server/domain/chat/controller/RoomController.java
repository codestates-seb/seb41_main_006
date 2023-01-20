package com.mainproject.server.domain.chat.controller;

import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.chat.service.RoomService;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import com.mainproject.server.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/chats")
public class RoomController {

    private final RoomService roomService;
    private final MemberService memberService;

    // 유저페이지에서 채팅방 조회
    @PostMapping
    public ResponseEntity getOrCreateRoom(@Positive @RequestParam(name = "receiver") long receiverId,
                                          @AuthenticationPrincipal MemberDetails memberDetails) {
        if(memberDetails == null) {
            log.info("인증 되지 않은 회원의 접근");
            return new ResponseEntity<>(ExceptionCode.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }
        // 탈퇴한 회원인지 확인
        Member receiver = memberService.validateVerifyMember(receiverId);
        if(receiver.getMemberStatus().equals(Member.MemberStatus.MEMBER_QUIT)) {
            log.info("receiver is quit");
            return new ResponseEntity<>("탈퇴한 회원입니다.", HttpStatus.NO_CONTENT);
        }


        //반환해야 할 값 : 채팅방 아이디, memberDetails의 멤버의 채팅 목록, 해당 유저와의 채팅 메세지(채팅방 정보에 들어있음)
        return null;
    }

    // 채팅방 조회
    @GetMapping("/{chat-room-id}")
    public ResponseEntity getChatRoom(@Positive @PathVariable("chat-room-id") long chatRoomId) {
        return null;
    }

    // 채팅방 목록 조회
    @GetMapping
    public ResponseEntity getChatRooms(@AuthenticationPrincipal MemberDetails memberDetails) {
        return null;
    }

    // 채팅 메세지 전송


}

