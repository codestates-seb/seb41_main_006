//package com.mainproject.server.domain.chat.controller;
//
//import com.mainproject.server.auth.userdetails.MemberDetails;
//import com.mainproject.server.domain.chat.dto.ChatDto;
//import com.mainproject.server.domain.chat.entity.ChatMessage;
//import com.mainproject.server.domain.chat.entity.ChatRoom;
//import com.mainproject.server.domain.chat.service.ChatService;
//import com.mainproject.server.domain.chat.service.RoomService;
//import com.mainproject.server.exception.ExceptionCode;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import javax.validation.constraints.Positive;
//import java.net.URI;
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/chats")
//public class ChatController {
//    private final static String CHAT_ROOM_DEFAULT_URI = "/chats";
//    private final ChatService chatService;
//    private final RoomService roomService;
//
//    // 유저 정보에서 채팅하기 접근
//    // 채팅방 생성 및 기존 채팅 가져오기
//    @PostMapping
//    public ResponseEntity createRoom(@Positive @RequestParam(name = "receiver") long receiverId,
//                                     @AuthenticationPrincipal MemberDetails memberDetails) {
//        if(memberDetails == null) {
//            return new ResponseEntity<>(ExceptionCode.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
//        }
//
//        // chatService judgeFirstChat()로 보내 해당 채팅를 판단(첫채팅 or 기존 채팅)할 수 있도록 한다.
//        boolean judge = chatService.judgeFirstChat(receiverId, memberDetails);
//
//        // 첫채팅이라면 새로운 채팅방을 생성하고 + 현재 로그인한 회원의 채팅 목록 보내주기
//        // 기존 채팅이 있다면 기본 채팅방(채팅 메세지)하고, 채팅 목록 보내주기
//        ChatDto.Response response = null;
//
//        if(judge) { // judge가 true면 첫 채팅이라는 것
//            long chatRoomId = roomService.createRoom(receiverId, memberDetails);
//            List<ChatRoom> chatRooms = roomService.findChatRooms(memberDetails.getMemberId());
//
//            response = ChatDto.Response.builder()
//                    .chatRoomId(chatRoomId)
//                    .chatRooms(chatRooms)
//                    .build();
//
//        } else {
//            chatService.getChatMessage(receiverId, memberDetails);
//        }
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
//
//
//    @GetMapping("/{chat-room-id}")
//    public ResponseEntity joinChatRoom(@Positive @PathVariable("chat-room-id") long chatRoomId,
//                                       @AuthenticationPrincipal MemberDetails memberDetails) {
//        // 현재 로그인한 사용자 정보를 받아와서 해당 사용자가 접근한 roomId로 Joinchat에 멤버 정보에서 해당 사용자의 정보가 있는지 확인하고 없으면  첫입장, 있으면 이전 내역 불러오기
//        if(memberDetails == null) {
//            return new ResponseEntity<>(ExceptionCode.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
//        }
//        return null;
//    }
//
//    // 메세지 전송
//
//}
//
