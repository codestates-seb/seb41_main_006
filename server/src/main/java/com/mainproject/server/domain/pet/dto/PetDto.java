package com.mainproject.server.domain.pet.dto;

import com.mainproject.server.awsS3.dto.S3UpFileResponse;
import com.mainproject.server.domain.member.dto.MemberDto;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.pet.entity.Pet;
import com.mainproject.server.validator.Gender;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

import java.time.LocalDateTime;

public class PetDto {
    @Getter
    @Builder
    public static class Post {

        @Pattern(regexp = "^[가-힣a-zA-Z]{1,10}$", message = "한글, 영어를 사용하여 10자 이내로 작성해주세요.")
        private String name;

        @Pattern(regexp = "^[0-9]{1,2}$", message = "최대 2글자까지만 허용합니다.")
        private String age;

        @Gender
        private String gender;

        @NotBlank(message = "이미지를 추가해주세요.")
        private String profileImage;

        @NotNull(message = "강아지의 사이즈를 선택해주세요.")
        private Pet.PetSize petSize;

        @NotNull(message = "강아지의 중성화 여부를 선택해주세요.")
        private boolean neutered;

        @NotNull(message = "강아지 소개글을 작성해주세요.")
        private String aboutDog;

        @NotBlank(message = "강아지의 종을 입력해주세요.")
        private String breed;

        @Positive
        private Long upFileId;
    }

    @Getter
    @Builder
    public static class Patch {

        @Pattern(regexp = "^[가-힣a-zA-Z]{1,10}$", message = "한글 또는 영어를 사용하여 10자 이내로 작성해주세요.")
        private String name;

        @Pattern(regexp = "^[0-9]{1,2}$", message = "최대 2글자까지만 허용합니다.")
        private String age;

        @Gender
        private String gender;

        @NotBlank(message = "이미지를 추가해주세요.")
        private String profileImage;

        @NotNull(message = "강아지의 사이즈를 선택해주세요.")
        private Pet.PetSize petSize;

        @NotNull(message = "강아지의 중성화 여부를 선택해주세요.")
        private boolean neutered;

        @NotNull(message = "강아지 소개글을 작성해주세요.")
        private String aboutDog;

        @NotBlank(message = "강아지의 종을 입력해주세요.")
        private String breed;
    }

    @Getter
    @Builder
    public static class Response {
        private Long petId;
        private String profileImage;
        private String name;
        private String age;
        private String gender;
        private Pet.PetSize petSize;
        private boolean neutered;
        private String aboutDog;
        private String breed;
        private MemberDto.ResponseOnlyMemberName member; // 멤버 아이디, 닉네임만 반환
        private S3UpFileResponse s3UpFileResponse; //업로드한 파일 전체 반환
    }

    /*회원 정보 포함 안하고 강아지 정보만 DTO로 매핑*/
    @Getter
    @Builder
    public static class SimpleResponse {
        private Long petId;
        private String name;
        private String age;
        private String gender;
        private Pet.PetSize petSize;
        private boolean neutered;
        private String aboutDog;
        private String breed;
        private S3UpFileResponse profileImage;
    }
}
