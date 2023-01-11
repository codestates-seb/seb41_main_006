package com.mainproject.server.domain.board.dto;

import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class BoardDto {
    @Getter
    @Builder
    public static class Post {

        @NotBlank(message = "제목을 입력해주세요.")
        private String title;

        @NotBlank(message = "내용을 입력해주세요.")
        private String content;

        @NotNull(message = "약속 시간을 입력해주세요.")
        private LocalDateTime appointTime;

        @NotBlank(message = "약속 장소를 입력해주세요.")
        private String meetingPlace;
    }
    @Getter
    @Builder
    public static class Patch {

        @NotBlank(message = "제목을 입력해주세요.")
        private String title;

        @NotBlank(message = "내용을 입력해주세요.")
        private String content;

        @NotNull(message = "약속 시간을 입력해주세요.")
        private LocalDateTime appointTime;

        @NotBlank(message = "약속 장소를 입력해주세요.")
        private String meetingPlace;

        @NotNull
        private Board.BoardStatus boardStatus;
    }
    @Getter
    @Builder
    public static class Response {
        private Long boardId;
        private Member member; // 가넝?
        private String title;
        private String content;
        private int countLike;
        private LocalDateTime appointTime;
        private String meetingPlace;
        private Board.BoardStatus boardStatus;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
