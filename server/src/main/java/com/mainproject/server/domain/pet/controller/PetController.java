package com.mainproject.server.domain.pet.controller;

import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.pet.dto.PetDto;
import com.mainproject.server.domain.pet.entity.Pet;
import com.mainproject.server.domain.pet.mapper.PetMapper;
import com.mainproject.server.domain.pet.service.PetService;
import com.mainproject.server.dto.MultiResponseDto;
import com.mainproject.server.dto.SingleResponseDto;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.response.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/pets")
public class PetController {

    private final PetService petService;
    private final PetMapper mapper;

    @PostMapping
    public ResponseEntity postPet(@Valid @RequestBody PetDto.Post petPostDto,
                                  @AuthenticationPrincipal MemberDetails memberDetails) {
        Long profileImageId = petPostDto.getProfileImageId();
        if (memberDetails == null) {
            return new ResponseEntity(ExceptionCode.NOT_AUTHORIZED,HttpStatus.UNAUTHORIZED);
        }

        Pet pet = petService.createPet(mapper.petPostDtoToPet(petPostDto), memberDetails, Optional.ofNullable(profileImageId));

        PetDto.Response response = mapper.petToPetResponseDto(pet);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{pet-id}")
    public ResponseEntity patchPet(@PathVariable("pet-id") @Positive long petId,
                                   @Valid @RequestBody PetDto.Patch petPatchDto,
                                   @AuthenticationPrincipal MemberDetails memberDetails) {
        Long profileImageId = petPatchDto.getProfileImageId();

        if(memberDetails == null) {
            return new ResponseEntity(ExceptionCode.NOT_AUTHORIZED,HttpStatus.UNAUTHORIZED);
        }

        Pet updatePet = petService.updatePet(petPatchDto, petId, memberDetails, Optional.ofNullable(profileImageId));

        PetDto.Response response = mapper.petToPetResponseDto(updatePet);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
    // 회원이 등록한 강아지 한마리만 가져오기
    @GetMapping("/{pet-id}")
    public ResponseEntity getPet(@Positive @PathVariable("pet-id") long petId) {
        Pet pet = petService.findPet(petId);
        PetDto.Response response = mapper.petToPetResponseDto(pet);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
    // 회원이 등록한 강아지 목록 가져오기
    @GetMapping("/my-pets")
    public ResponseEntity getPets(@Positive @RequestParam(defaultValue = "1") int page,
                                  @Positive @RequestParam(defaultValue = "10") int size,
                                  @AuthenticationPrincipal MemberDetails memberDetails) {

        if(memberDetails == null) {
            return new ResponseEntity(ExceptionCode.NOT_AUTHORIZED,HttpStatus.UNAUTHORIZED);
        }

        Page<Pet> petPage = petService.findMyPets(page, size, memberDetails);

        PageInfo pageInfo = new PageInfo(page, size, (int)petPage.getTotalElements(), petPage.getTotalPages());
        List<Pet> pets = petPage.getContent();
        List<PetDto.SimpleResponse> responses = mapper.petListToSimpleResponseDtos(pets);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageInfo), HttpStatus.OK);
    }

    // search(petSize) 값이 존재하면 검색된 값만 반환, search 값이 없으면 단순 목록 조회
    @GetMapping
    public ResponseEntity searchPets(@Positive @RequestParam(defaultValue = "1")  int page,
                                  @Positive @RequestParam(defaultValue = "10")  int size,
                                  @RequestParam(value = "search") String keyword) {
        Page<Pet> petPage;

        if(keyword != null || !keyword.isEmpty()) {
            petPage = petService.findPetByPetSize(page, size, mapper.StringGetPetSize(keyword));
        } else {
            petPage = petService.findPets(page, size);
        }

        PageInfo pageInfo = new PageInfo(page, size, (int) petPage.getTotalElements(), petPage.getTotalPages());

        List<Pet> pets = petPage.getContent();
        List<PetDto.Response> responses = mapper.petListToPetResponseDtos(pets);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageInfo), HttpStatus.OK);
    }

    @DeleteMapping("/{pet-id}")
    public ResponseEntity deletePet(@PathVariable("pet-id") @Positive long petId,
                                    @AuthenticationPrincipal MemberDetails memberDetails) {

        if(memberDetails == null) {
            return new ResponseEntity(ExceptionCode.NOT_AUTHORIZED,HttpStatus.UNAUTHORIZED);
        }
        petService.deletePets(petId, memberDetails);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
