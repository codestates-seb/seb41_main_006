package com.mainproject.server.domain.chat.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomId;

    @Column
    private String title;

    @Column
    private ChatRoomStatus chatRoomStatus;

    @JsonIgnore
    @OneToMany(mappedBy = "chatRoom")
    private List<JoinChat> joinChats = new ArrayList<>();

    public void addJoinChat(JoinChat joinChat) {
        this.joinChats.add(joinChat);
        if(joinChat.getChatRoom() != this) {
            joinChat.setChatRoom(this);
        }
    }

    public enum ChatRoomStatus {
        CREATE("채팅방 생성"),
        KEEP("채팅방 유지"),
        DELETE("채팅방 삭제");

        private String status;

        ChatRoomStatus(String status) {
            this.status = status;
        }
    }
}
