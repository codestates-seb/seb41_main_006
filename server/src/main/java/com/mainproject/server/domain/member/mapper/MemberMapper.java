package com.mainproject.server.domain.member.mapper;

import com.mainproject.server.awsS3.dto.S3UpFileResponse;
import com.mainproject.server.awsS3.entity.S3UpFile;
import com.mainproject.server.domain.member.dto.MemberDto;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.pet.dto.PetDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post requestBody);

    Member memberPathDtoToMember(MemberDto.Patch requestBody);

    @Mapping(source = "s3UpFile.upFileId", target = "profileImage.upFileId")
    @Mapping(source = "s3UpFile.upFileName", target = "profileImage.upFileName")
    @Mapping(source = "s3UpFile.upFileUrl", target = "profileImage.upFileUrl")
    MemberDto.SimpleResponse memberToMemberSimpleResponseDto(Member member);

    List<MemberDto.SimpleResponse> membersToMemberSimpleResponseDtos(List<Member> members);

    @Mapping(source = "s3UpFile.upFileId", target = "profileImage.upFileId")
    @Mapping(source = "s3UpFile.upFileName", target = "profileImage.upFileName")
    @Mapping(source = "s3UpFile.upFileUrl", target = "profileImage.upFileUrl")
    MemberDto.ResponseWithFullAddress memberToResponseWithFullAddress(Member member, String fullAddress, S3UpFile s3UpFile);

    default MemberDto.ResponseWithPets memberToMemberResponseWithPetsDto(Member member) {
        return MemberDto.ResponseWithPets.builder()
                .memberId(member.getMemberId())
                .nickName(member.getNickName())
                .email(member.getEmail())
                .memberAge(member.getMemberAge())
                .gender(member.getGender())
                .address(member.getAddress())
                .memberStatus(member.getMemberStatus())
                .aboutMe(member.getAboutMe())
                .profileImage(member.getS3UpFile() == null ? null :
                        S3UpFileResponse.builder()
                                .upFileId(member.getS3UpFile().getUpFileId())
                                .upFileName(member.getS3UpFile().getUpFileName())
                                .upFileUrl(member.getS3UpFile().getUpFileUrl())
                                .build())
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
                                .profileImage(
                                        pet.getS3UpFile() == null ? null :
                                                S3UpFileResponse.builder()
                                                        .upFileId(pet.getS3UpFile().getUpFileId())
                                                        .upFileName(pet.getS3UpFile().getUpFileName())
                                                        .upFileUrl(pet.getS3UpFile().getUpFileUrl())
                                                        .build())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

//    MemberDto.ResponseWithPets memberToMemberResponseWithPetsDto(Member member);

    List<MemberDto.ResponseWithPets> membersToMemberResponseWithPetsDto(List<Member> member);

    @Mapping(source = "s3UpFile.upFileId", target = "profileImage.upFileId")
    @Mapping(source = "s3UpFile.upFileName", target = "profileImage.upFileName")
    @Mapping(source = "s3UpFile.upFileUrl", target = "profileImage.upFileUrl")
    MemberDto.ResponseOnlyMemberName memberToMemberResponseOnlyMemberName(Member member);
}
