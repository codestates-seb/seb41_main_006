package com.mainproject.server.domain.chat.entity;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @Column
    private String content;

    @Column
    private long senderId;

    @Column
    private LocalDateTime sendTime = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "join_chat_id")
    private JoinChat joinChat;

    public void setJoinChat(JoinChat joinChat) {
        this.joinChat = joinChat;
        if(!joinChat.getChatMessages().contains(this)){
            joinChat.getChatMessages().add(this);
        }
    }

    public void setSenderId(JoinChat joinChat) {
        if(joinChat != null) {
            senderId = joinChat.getMember().getMemberId();
        }
    }
}
