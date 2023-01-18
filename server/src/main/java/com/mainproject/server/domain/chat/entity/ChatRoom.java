package com.mainproject.server.domain.chat.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomId;
    @JsonIgnore
    @OneToMany(mappedBy = "chatRoom")
    private List<JoinChat> joinChats = new ArrayList<>();

    public void addJoinChat(JoinChat joinChat) {
        this.joinChats.add(joinChat);
        if(joinChat.getChatRoom() != this) {
            joinChat.setChatRoom(this);
        }
    }
}
