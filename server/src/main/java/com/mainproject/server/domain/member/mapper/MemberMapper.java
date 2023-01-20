package com.mainproject.server.domain.member.mapper;

import com.mainproject.server.domain.member.dto.MemberDto;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.pet.dto.PetDto;
import com.mainproject.server.domain.pet.entity.Pet;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post requestBody);

    Member memberPathDtoToMember(MemberDto.Patch requestBody);

    MemberDto.SimpleResponse memberToMemberSimpleResponseDto(Member member);

    List<MemberDto.SimpleResponse> membersToMemberSimpleResponseDtos(List<Member> members);

    default MemberDto.ResponseWithPets memberToMemberResponseWithPetsDto(Member member) {
        return MemberDto.ResponseWithPets.builder()
                .memberId(member.getMemberId())
                .nickName(member.getNickName())
                .email(member.getEmail())
                .memberAge(member.getMemberAge())
                .gender(member.getGender())
                .address(member.getAddress())
                .memberStatus(member.getMemberStatus())
                .profileImage(member.getProfileImage())
                .aboutMe(member.getAboutMe())
                .petsInfo(member.getPets()
                        .stream()
                        .map(pet -> PetDto.SimpleResponse.builder()
                                .petId(pet.getPetId())
                                .profileImage(pet.getProfileImage())
                                .name(pet.getName())
                                .age(pet.getAge())
                                .gender(pet.getGender())
                                .petSize(pet.getPetSize())
                                .neutered(pet.isNeutered())
                                .aboutDog(pet.getAboutDog())
                                .breed(pet.getBreed())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

//    MemberDto.ResponseWithPets memberToMemberResponseWithPetsDto(Member member);

    List<MemberDto.ResponseWithPets> membersToMemberResponseWithPetsDto(List<Member> member);
}
