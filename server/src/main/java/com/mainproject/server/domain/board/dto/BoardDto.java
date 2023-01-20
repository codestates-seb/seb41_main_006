package com.mainproject.server.domain.board.dto;

import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.comments.dto.CommentsDto;
import com.mainproject.server.domain.member.dto.MemberDto;
import com.mainproject.server.domain.member.entity.Member;

import com.mainproject.server.domain.pet.dto.PetDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;

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

        @Pattern(regexp = "^[0-9]{10}$")
        @NotBlank
        private String placeCode;

        @Pattern(regexp = "^([0-9]{2,3}).?([0-9]*)$")
        @NotBlank
        private String x;

        @Pattern(regexp = "^([0-9]{2,3}).?([0-9]*)$")
        @NotBlank
        private String y;

        @NotNull(message = "강아지를 선택해주세요.")
        private long petId;

    }
    @Getter
    @Builder
    public static class Patch {

        @NotBlank(message = "제목을 입력해주세요.")
        private String title;

        @NotBlank(message = "내용을 입력해주세요.")
        private String content;

        private Board.BoardStatus boardStatus;

        @NotNull(message = "약속 시간을 입력해주세요.")
        private LocalDateTime appointTime;

        @NotBlank(message = "약속 장소를 입력해주세요.")
        private String placeCode;

        @Pattern(regexp = "^([0-9]{2,3}).?([0-9]*)$")
        @NotBlank
        private String x;

        @Pattern(regexp = "^([0-9]{2,3}).?([0-9]*)$")
        @NotBlank
        private String y;

        @NotNull(message = "강아지를 선택해주세요.")
        private long petId;
    }
    @Getter
    @Builder
    public static class Response {
        private Long boardId;
        private String title;
        private String content;
        private int countLike;
        private LocalDateTime appointTime;
        private String placeCode;
        private String x;
        private String y;
        private PetDto.SimpleResponse pet;
        private Board.BoardStatus boardStatus;

        private MemberDto.SimpleResponse member;
        private List<CommentsDto.Response> comments;

        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
