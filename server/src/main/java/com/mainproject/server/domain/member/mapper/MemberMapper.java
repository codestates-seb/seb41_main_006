package com.mainproject.server.domain.member.mapper;

import com.mainproject.server.awsS3.entity.S3UpFile;
import com.mainproject.server.domain.member.dto.MemberDto;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.pet.dto.PetDto;
import com.mainproject.server.domain.pet.entity.Pet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post requestBody);

    Member memberPathDtoToMember(MemberDto.Patch requestBody);

//    @Mapping(source = "s3UpFile.upFileId", target = "upFileId")
//    default MemberDto.SimpleResponse memberToMemberSimpleResponseDto(Member member){
//        Optional<Long> upFileId = Optional.ofNullable(member.getS3UpFile()).map(S3UpFile::getUpFileId);
//
//        return MemberDto.SimpleResponse.builder()
//            .memberId(member.getMemberId())
//            .nickName(member.getNickName())
//            .email(member.getEmail())
//            .memberAge(member.getMemberAge())
//            .gender(member.getGender())
//            .address(member.getAddress())
//            .memberStatus(member.getMemberStatus())
//            .aboutMe(member.getAboutMe())
//            .upFileId(upFileId)
//            .build();
//    }

    @Mapping(source = "s3UpFile.upFileId", target = "profileImage.upFileId")
    @Mapping(source = "s3UpFile.upFileName", target = "profileImage.upFileName")
    @Mapping(source = "s3UpFile.upFileUrl", target = "profileImage.upFileUrl")
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
//                .profileImage(member.getProfileImage())
                .aboutMe(member.getAboutMe())
                .petsInfo(member.getPets()
                        .stream()
                        .map(pet -> PetDto.SimpleResponse.builder()
                                .petId(pet.getPetId())
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

    MemberDto.ResponseOnlyMemberName memberToMemberResponseOnlyMemberName(Member member);
}
