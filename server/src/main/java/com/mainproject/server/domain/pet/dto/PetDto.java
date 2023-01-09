package com.mainproject.server.domain.pet.dto;

import com.mainproject.server.domain.pet.entity.Pet;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class PetDto {
    @Getter
    @Builder
    public static class Post {

        @NotBlank(message = "이름을 입력해주세요.")
        private String name;

        @NotNull(message = "나이를 입력해주세요.")
        private int age;

        @NotNull(message = "강아지의 사이즈를 선택해주세요.")
        private Pet.PetSize petSize;

        @NotNull(message = "강아지의 중성화 여부를 선택해주세요.")
        private boolean neutered;

        @NotNull
        private String aboutDog;

        @NotBlank(message = "강아지의 종을 입력해주세요.")
        private String breed;
    }

    @Getter
    @Builder
    public static class Patch {

        private Long petId;

        @NotBlank(message = "이름을 입력해주세요.")
        private String name;

        @NotNull(message = "나이를 입력해주세요.")
        private int age;

        @NotNull(message = "강아지의 사이즈를 선택해주세요.")
        private Pet.PetSize petSize;

        @NotNull(message = "강아지의 중성화 여부를 선택해주세요.")
        private boolean neutered;

        @NotNull
        private String aboutDog;

        @NotBlank(message = "강아지의 종을 입력해주세요.")
        private String breed;
    }

    @Getter
    @Builder
    public static class Response {
        private Long petId;
        private String name;
        private int age;
        private Pet.PetSize petSize;
        private boolean neutered;
        private String aboutDog;
        private String breed;
    }
}
