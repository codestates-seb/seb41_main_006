package com.mainproject.server.domain.chat.dto;

import com.mainproject.server.domain.member.dto.MemberDto;
import com.mainproject.server.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

public class ChatDto {
    @Getter
    public static class Post {
        @NotNull
        private long memberId; // 채팅을 받는 사람
    }
    @Getter
    @Builder
    public static class RoomResponse { // 채팅방 하나와 그에 속해 있는 메세지들 + 채팅방 목록
        private long roomId;
        private MemberDto.ResponseOnlyMemberName sender;
        private MemberDto.ResponseOnlyMemberName receiver;
        private List<MessageResponse> messages;
        @Setter
        private List<OnlyRoomResponse> rooms; // 별도로 주입 필요

    }
    @Getter
    @Builder
    public static class MessageResponse { // 채팅방 속 하나의 메세지
        private long messageId;
        private MemberDto.ResponseOnlyMemberName sender;
        private String content;
        private LocalDateTime sendTime;
    }

    @Getter
    @Builder
    public static class OnlyRoomResponse { // 채팅방 하나의 정보
        private long roomId;
        private MemberDto.ResponseOnlyMemberName sender;
        private MemberDto.ResponseOnlyMemberName receiver;
    }
}
