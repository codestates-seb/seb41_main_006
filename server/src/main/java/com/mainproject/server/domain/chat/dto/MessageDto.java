package com.mainproject.server.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Builder
public class MessageDto {
    @NotNull
    private long roomId;
    @NotNull
    private long memberId;
    @NotBlank
    private String content;
}
