package com.mainproject.server.domain.chat.controller;

import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.chat.dto.ChatDto;
import com.mainproject.server.domain.chat.entity.ChatMessage;
import com.mainproject.server.domain.chat.entity.ChatRoom;
import com.mainproject.server.domain.chat.mapper.ChatMapper;
import com.mainproject.server.domain.chat.service.ChatService;
import com.mainproject.server.domain.chat.service.RoomService;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import com.mainproject.server.dto.MultiResponseDto;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.response.PageInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@Slf4j
@Validated
@RequestMapping("/chats")
@RequiredArgsConstructor
public class RoomController {

    private final MemberService memberService;
    private final RoomService roomService;
    private final ChatService chatService;
    private final ChatMapper mapper;

    // 채팅방 주소 가져오기
    @PostMapping
    public ResponseEntity getOrCreateRoom(@Valid @RequestBody ChatDto.Post postDto,
                                          @AuthenticationPrincipal MemberDetails memberDetails) {
        if(memberDetails == null) {
            log.info("인증되지 않은 회원으로 채팅방을 생성할 수 없음");
            return new ResponseEntity<>(ExceptionCode.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        // 탈퇴한 회원 확인
        Member receiver = memberService.validateVerifyMember(mapper.ChatPostDtoToMember(postDto).getMemberId());

        if(receiver.getMemberStatus().equals(Member.MemberStatus.MEMBER_QUIT)){
            log.info("탈퇴한 회원으로 채팅 요청을 보낼 수 없음");
            return new ResponseEntity<>("탈퇴한 회원", HttpStatus.NO_CONTENT);
        }

        long roomId = roomService.createRoom(receiver.getMemberId(), memberDetails);

        URI location = UriComponentsBuilder.newInstance()
                .path("/chats/{room-id}")
                .buildAndExpand(roomId)
                .toUri();

        return ResponseEntity.created(location).build();

    }

    //  채팅방 열기
    @GetMapping("/{room-id}")
    public ResponseEntity getChatRoom(@Positive @PathVariable("room-id") long roomId,
                                      @AuthenticationPrincipal MemberDetails memberDetails) {
        if(memberDetails == null) {
            log.info("인증되지 않은 회원으로 채팅방을 가져올 수 없음");
            return new ResponseEntity<>(ExceptionCode.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }
        ChatRoom chatRoom = roomService.findRoom(roomId);
        ChatDto.RoomResponse response = mapper.chatRoomToRoomResponseDto(chatRoom);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 채팅 목록 조회 -> 로그인한 유저가 참여하고 있는 채팅 목록
    @GetMapping
    public ResponseEntity getChatRooms(@AuthenticationPrincipal MemberDetails memberDetails) {

        if(memberDetails == null) {
            log.info("인증되지 않은 회원의 접근");
            return new ResponseEntity<>(ExceptionCode.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        Page<ChatRoom> roomPage = roomService.findRooms(memberDetails);
        PageInfo pageInfo = new PageInfo(1, 10, (int)roomPage.getTotalElements(), roomPage.getTotalPages());

        List<ChatRoom> rooms = roomPage.getContent();
        List<ChatDto.RoomResponse> responses = mapper.chatRoomListToRoomResponseDtos(rooms);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageInfo), HttpStatus.OK);
    }
}
