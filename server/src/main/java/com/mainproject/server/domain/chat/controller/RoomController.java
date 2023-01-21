package com.mainproject.server.domain.chat.controller;

import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.chat.dto.ChatDto;
import com.mainproject.server.domain.chat.entity.ChatRoom;
import com.mainproject.server.domain.chat.mapper.ChatMapper;
import com.mainproject.server.domain.chat.service.RoomService;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import com.mainproject.server.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class RoomController {

    private final MemberService memberService;
    private final RoomService roomService;
    private final ChatMapper mapper;

    // 유저 정보 페이지에서 접근할 경우 -> 유저가 참여하고 있는 채팅목록, 요청을 보낸 유저와의 채팅방과 메세지
    @PostMapping
    public ResponseEntity getOrCreateRoom(@Valid @RequestBody ChatDto.Post postDto,
                                          @AuthenticationPrincipal MemberDetails memberDetails) {
        if(memberDetails == null) {
            log.info("인증되지 않은 회원의 접근");
            return new ResponseEntity<>(ExceptionCode.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        // 탈퇴한 회원 확인
        Member receiver = memberService.validateVerifyMember(mapper.ChatPostDtoToMember(postDto).getMemberId());

        if(receiver.getMemberStatus().equals(Member.MemberStatus.MEMBER_QUIT)){
            log.info("탈퇴한 회원으로 채팅 요청을 보낼 수 없음");
            return new ResponseEntity<>("탈퇴한 회원", HttpStatus.NO_CONTENT);
        }

        ChatRoom chatRoom = roomService.createRoom(receiver.getMemberId(), memberDetails);

        ChatDto.RoomResponse response = mapper.chatRoomToRoomResponseDto(chatRoom);

        // sender의 채팅 목록 가져오기
        List<ChatRoom> chatRooms = roomService.findRooms(memberDetails);
        // 가져온 채팅 목록 Dto로 변경 후, response에 넣기
        List<ChatDto.OnlyRoomResponse> roomResponse = mapper.chatRoomsToOnlyRoomResponseDtos(chatRooms);

        response.setRooms(roomResponse);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    //  채팅방 조회 -> 메세지 가져오기
    @GetMapping("/{room-id}")
    public ResponseEntity getChatRoom(@Positive @PathVariable("room-id") long roomId,
                                      @AuthenticationPrincipal MemberDetails memberDetails) {
        if(memberDetails == null) {
            log.info("인증되지 않은 회원의 접근");
            return new ResponseEntity<>(ExceptionCode.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }
        ChatRoom chatRoom = roomService.findRoom(roomId);
        ChatDto.RoomResponse response = mapper.chatRoomToRoomResponseDto(chatRoom);

        List<ChatRoom> rooms = roomService.findRooms(memberDetails);
        List<ChatDto.OnlyRoomResponse> roomResponses = mapper.chatRoomsToOnlyRoomResponseDtos(rooms);

        response.setRooms(roomResponses);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 채팅 목록 조회 -> 로그인한 유저가 참여하고 있는 채팅 목록
    @GetMapping
    public ResponseEntity getChatRooms(@AuthenticationPrincipal MemberDetails memberDetails) {

        if(memberDetails == null) {
            log.info("인증되지 않은 회원의 접근");
            return new ResponseEntity<>(ExceptionCode.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }
        List<ChatRoom> rooms = roomService.findRooms(memberDetails);
        List<ChatDto.OnlyRoomResponse> responses = mapper.chatRoomsToOnlyRoomResponseDtos(rooms);

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
}
