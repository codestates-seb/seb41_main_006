package com.mainproject.server.factory;

import com.mainproject.server.awsS3.dto.S3UpFileResponse;
import com.mainproject.server.domain.member.dto.MemberDto;
import com.mainproject.server.domain.member.entity.Member;

public class MemberFactory {
    public static MemberDto.ResponseOnlyMemberName createMemberResponseDto() {
        MemberDto.ResponseOnlyMemberName response = MemberDto.ResponseOnlyMemberName.builder()
                .memberId(1L)
                .nickName("사람")
                .profileImage(S3UpFileFactory.createMemberS3Response())
                .build();

        return response;
    }
    public static Member createMember() {
        Member member = new Member();
        member.setMemberId(1L);
        member.setEmail("test@gmail.com");
        return member;
    }
}
