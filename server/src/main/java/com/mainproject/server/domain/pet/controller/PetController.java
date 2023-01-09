package com.mainproject.server.domain.pet.controller;

import com.mainproject.server.domain.pet.dto.PetDto;
import com.mainproject.server.domain.pet.entity.Pet;
import com.mainproject.server.domain.pet.mapper.PetMapper;
import com.mainproject.server.domain.pet.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity postPet(@Valid @RequestBody PetDto.Post petPostDto) {

       Pet pet = petService.createPet(mapper.petPostDtoToPet(petPostDto));

       PetDto.Response response = mapper.petToPetResponseDto(pet);

       return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{pet-id}")
    public ResponseEntity patchPet(@PathVariable("pet-id") @Positive long petId,
                                   @Valid @RequestBody PetDto.Patch petPatchDto) {

        Pet pet = petService.updatePet(mapper.petPatchDtoToPet(petPatchDto));

        PetDto.Response response = mapper.petToPetResponseDto(pet);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity searchPets(@Positive @RequestParam(defaultValue = "1")  int page,
                                  @Positive @RequestParam(defaultValue = "10")  int size,
                                  @RequestParam(value = "keyword") String keyword) {

        Page<Pet> petPage = petService.findPetByKeyword(page, size, keyword);
        List<Pet> pets = petPage.getContent();

        List<PetDto.Response> responses = mapper.petListToPetResponseDtos(pets);

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @DeleteMapping("/{pet-id}")
    public ResponseEntity deletePet(@PathVariable("pet-id") @Positive long petId) {

        petService.deletePets(petId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
