package com.mainproject.server.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    @NotNull
    private Long roomId;
    @NotNull
    private Long senderId;
    @NotBlank
    private String content;

    public void setContent(String content) {
        this.content = content;
    }
}
