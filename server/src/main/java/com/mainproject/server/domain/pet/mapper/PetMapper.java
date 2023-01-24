package com.mainproject.server.domain.pet.mapper;

import com.mainproject.server.domain.pet.dto.PetDto;
import com.mainproject.server.domain.pet.entity.Pet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PetMapper {
    Pet petPostDtoToPet (PetDto.Post petPostDto);
    Pet petPatchDtoToPet (PetDto.Patch petPatchDto);
    @Mapping(source = "s3UpFile", target = "profileImage",
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(source = "s3UpFile.upFileId", target = "profileImage.upFileId")
    @Mapping(source = "s3UpFile.upFileName", target = "profileImage.upFileName")
    @Mapping(source = "s3UpFile.upFileUrl", target = "profileImage.upFileUrl")
    PetDto.Response petToPetResponseDto(Pet pet);

    List<PetDto.Response> petListToPetResponseDtos(List<Pet> pets);
    Pet.PetSize StringGetPetSize(String keyword);

    @Mapping(source = "s3UpFile", target = "profileImage",
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(source = "s3UpFile.upFileId", target = "profileImage.upFileId")
    @Mapping(source = "s3UpFile.upFileName", target = "profileImage.upFileName")
    @Mapping(source = "s3UpFile.upFileUrl", target = "profileImage.upFileUrl")
    PetDto.SimpleResponse petToSimpleResponseDto(Pet pet);

//    @Mapping(source = "s3UpFile.upFileId", target = "profileImage.upFileId")
//    @Mapping(source = "s3UpFile.upFileName", target = "profileImage.upFileName")
//    @Mapping(source = "s3UpFile.upFileUrl", target = "profileImage.upFileUrl")
    List<PetDto.SimpleResponse> petListToSimpleResponseDtos(List<Pet> pets);
}
