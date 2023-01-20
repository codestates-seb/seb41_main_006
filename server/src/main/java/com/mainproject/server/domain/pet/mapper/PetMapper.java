package com.mainproject.server.domain.pet.mapper;

import com.mainproject.server.domain.pet.dto.PetDto;
import com.mainproject.server.domain.pet.entity.Pet;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PetMapper {
    Pet petPostDtoToPet (PetDto.Post petPostDto);
    Pet petPatchDtoToPet (PetDto.Patch petPatchDto);
    PetDto.Response petToPetResponseDto(Pet pet);
    List<PetDto.Response> petListToPetResponseDtos(List<Pet> pets);
    Pet.PetSize StringGetPetSize(String keyword);

    PetDto.SimpleResponse petToSimpleResponseDto(Pet pet);

    List<PetDto.SimpleResponse> petListToSimpleResponseDtos(List<Pet> pets);
}
