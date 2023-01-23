package com.mainproject.server.domain.chat.mapper;

import com.mainproject.server.domain.chat.dto.ChatDto;
import com.mainproject.server.domain.chat.dto.MessageDto;
import com.mainproject.server.domain.chat.entity.ChatMessage;
import com.mainproject.server.domain.chat.entity.ChatRoom;
import com.mainproject.server.domain.member.dto.MemberDto;
import com.mainproject.server.domain.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChatMapper {
    Member ChatPostDtoToMember(ChatDto.Post post);
    MemberDto.ResponseOnlyMemberName memberToMembernameResponseDto(Member member);

    ChatDto.RoomResponse chatRoomToRoomResponseDto(ChatRoom chatRoom);
    List<ChatDto.RoomResponse> chatRoomListToRoomResponseDtos(List<ChatRoom> chatRooms);

    ChatDto.MessageResponse messageToMessageResponseDto(ChatMessage message);

    List<ChatDto.MessageResponse> messagesToMessageResponseDtos(List<ChatMessage> messages);

    ChatMessage PostDtoToChatMessage (MessageDto messageDto);
}
