package com.mainproject.server.domain.pet.controller;

import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.pet.dto.PetDto;
import com.mainproject.server.domain.pet.entity.Pet;
import com.mainproject.server.domain.pet.mapper.PetMapper;
import com.mainproject.server.domain.pet.service.PetService;
import com.mainproject.server.dto.MultiResponseDto;
import com.mainproject.server.dto.SingleResponseDto;
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

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/pets")
public class PetController {

    private final PetService petService;
    private final PetMapper mapper;

    @PostMapping
    public ResponseEntity postPet(@Valid @RequestBody PetDto.Post petPostDto,
                                  @AuthenticationPrincipal Member member) {
        if (member != null) {
            Pet pet = petService.createPet(mapper.petPostDtoToPet(petPostDto), member);

            PetDto.Response response = mapper.petToPetResponseDto(pet);

            return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
        } else {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }

    @PatchMapping("/{pet-id}")
    public ResponseEntity patchPet(@PathVariable("pet-id") @Positive long petId,
                                   @Valid @RequestBody PetDto.Patch petPatchDto,
                                   @AuthenticationPrincipal Member member) {
        if(member != null) {
            Pet pet = mapper.petPatchDtoToPet(petPatchDto);
            pet.setPetId(petId);

            petService.updatePet(pet, member);

            PetDto.Response response = mapper.petToPetResponseDto(pet);

            return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping("/{pet-id}")
    public ResponseEntity getPet(@Positive @PathVariable("pet-id") long petId) {
        Pet pet = petService.findPet(petId);
        PetDto.Response response = mapper.petToPetResponseDto(pet);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getPets(@Positive @RequestParam(defaultValue = "1") int page,
                                  @Positive @RequestParam(defaultValue = "10") int size) {
        Page<Pet> pets = petService.findPets(page, size);
        PageInfo pageInfo = new PageInfo(page, size, (int)pets.getTotalElements(), pets.getTotalPages());

        List<Pet> petList = pets.getContent();
        List<PetDto.Response> responses = mapper.petListToPetResponseDtos(petList);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageInfo), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity searchPets(@Positive @RequestParam(defaultValue = "1")  int page,
                                  @Positive @RequestParam(defaultValue = "10")  int size,
                                  @RequestParam(value = "pet_size") String keyword) {

        Page<Pet> petPage = petService.findPetByKeyword(page, size, mapper.StringGetPetSize(keyword));

        PageInfo pageInfo = new PageInfo(page, size, (int) petPage.getTotalElements(), petPage.getTotalPages());

        List<Pet> pets = petPage.getContent();
        List<PetDto.Response> responses = mapper.petListToPetResponseDtos(pets);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageInfo), HttpStatus.OK);
    }

    @DeleteMapping("/{pet-id}")
    public ResponseEntity deletePet(@PathVariable("pet-id") @Positive long petId,
                                    @AuthenticationPrincipal Member member) {
        if(member != null) {
            petService.deletePets(petId, member);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

}
