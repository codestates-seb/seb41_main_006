package com.mainproject.server.domain.chat.entity;

import com.mainproject.server.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JoinChat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long joinChatId;

    @ManyToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "joinChat")
    private List<ChatMessage> chatMessages = new ArrayList<>();

    public void setChatRoom(ChatRoom chatRoom) {
        this.chatRoom = chatRoom;
        if(!chatRoom.getJoinChats().contains(this)){
            chatRoom.getJoinChats().add(this);
        }
    }

    public void setMember(Member member) {
        this.member = member;
        if(!member.getJoinChats().contains(this)) {
            member.getJoinChats().add(this);
        }
    }

    public void addChatMessage(ChatMessage chatMessage) {
        this.chatMessages.add(chatMessage);
        if(chatMessage.getJoinChat() != this) {
            chatMessage.setJoinChat(this);
        }
    }
}
