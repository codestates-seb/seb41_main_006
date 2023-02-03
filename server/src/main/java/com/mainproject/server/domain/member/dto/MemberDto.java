package com.mainproject.server.domain.member.dto;

import com.mainproject.server.awsS3.dto.S3UpFileResponse;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.pet.dto.PetDto;
import com.mainproject.server.validator.Gender;
import com.mainproject.server.validator.MemberAge;
import com.mainproject.server.validator.MemberStatus;
import com.mainproject.server.validator.NotSpace;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.List;

public class MemberDto {

    @Getter
    @Builder
    public static class Post {
        @NotBlank
        private String nickName;

        @NotBlank
        @Email
        private String email;

        @Pattern(regexp ="^(?=.*\\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\\da-zA-Z~!@#$%^&*]+$",
                message = "영문자와 숫자로 구성되며 최소 하나 이상의 특수문자(~!@#$%^&*)가 포함되어야합니다. "+
                        "공백은 포함될 수 없습니다")
        @NotNull
        @Size(min = 8, max = 16)
        private String password;

        @NotNull
        @MemberAge
        private Member.MemberAge memberAge;

        //todo enum 하나 빼서 강아지 성별이랑 같이 쓰도록?
        // enum을 검증하는 validation 어노테이션도 추가?
        @NotNull
        @Gender
        private String gender;

        @NotBlank
        private String address;

        private String aboutMe;

        @Positive
        private Long profileImageId;
    }

    @Getter
    @Builder
    public static class Patch {

        @NotSpace
        private String nickName;

        //todo 비밀번호 변경 따로 만들기

//        @Pattern(regexp ="^(?=.*\\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\\da-zA-Z~!@#$%^&*]+$",
//                message = "영문자와 숫자로 구성되며 최소 하나 이상의 특수문자(~!@#$%^&*)가 포함되어야합니다. "+
//                        "공백은 포함될 수 없습니다")
//        @Size(min = 8, max = 16)
//        private String password;

        @MemberAge
        private Member.MemberAge memberAge;

        @Gender
        private String gender;

        @NotSpace
        private String address;

        private String aboutMe;

        @MemberStatus
        private Member.MemberStatus memberStatus;

        @Positive
        private Long profileImageId;

    }

    @Getter
    @Builder
    public static class Active {
        @MemberStatus
        private Member.MemberStatus memberStatus;
    }

    @Getter
    @Builder
    public static class SimpleResponse {
        private long memberId;
        private String nickName;
        private String email;
        private Member.MemberAge memberAge;
        private String gender;
        private String address;
        private Member.MemberStatus memberStatus;
        private String aboutMe;
        private S3UpFileResponse profileImage;
    }

    @Getter
    @Builder
    public static class ResponseWithFullAddress {
        private long memberId;
        private String nickName;
        private String email;
        private Member.MemberAge memberAge;
        private String gender;
        private String address;
        private String fullAddress;
        private Member.MemberStatus memberStatus;
        private String aboutMe;
        private S3UpFileResponse profileImage;
    }

    @Getter
    @Builder
    public static class ResponseWithPets {
        private long memberId;
        private String nickName;
        private String email;
        private Member.MemberAge memberAge;
        private String gender;
        private String address;
        private String fullAddress;
        private Member.MemberStatus memberStatus;
        private S3UpFileResponse profileImage;
        private String aboutMe;
        private List<PetDto.SimpleResponse> petsInfo;

    }

    @Getter
    @Builder
    public static class ResponseOnlyMemberName {
        private long memberId;
        private String nickName;
        private S3UpFileResponse profileImage;
    }
}
