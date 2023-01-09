package com.mainproject.server.domain.member.mapper;

import com.mainproject.server.domain.member.dto.MemberDto;
import com.mainproject.server.domain.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post requestBody);

    Member memberPathDtoToMember(MemberDto.Patch requestBody);

    MemberDto.Response memberToMemberResponseDto(Member member);
}
