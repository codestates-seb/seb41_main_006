package com.mainproject.server.domain.pet.service;

import com.mainproject.server.domain.pet.entity.Pet;
import com.mainproject.server.domain.pet.repository.PetRepository;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PetService {
    private final PetRepository petRepository;

    public Pet createPet(Pet pet) {

        verifyOverlapByPetName(pet.getName());

        return petRepository.save(pet);
    }
    public Pet updatePet(Pet pet) {

        Pet findPet = findVerifiedPet(pet.getPetId());

        Optional.ofNullable(pet.getName())
                .ifPresent(findPet::setName);

        Optional.ofNullable(pet.getAge())
                .ifPresent(findPet::setAge);

        Optional.ofNullable(pet.getPetSize())
                .ifPresent(findPet::setPetSize);

        Optional.ofNullable(pet.isNeutered())
                .ifPresent(findPet::setNeutered);

        Optional.ofNullable(pet.getAboutDog())
                .ifPresent(findPet::setAboutDog);

        Optional.ofNullable(pet.getBreed())
                .ifPresent(findPet::setBreed);

        return petRepository.save(findPet);
    }
    public Pet findPet(long petId) {
        return findVerifiedPet(petId);
    }
    public Page<Pet> findPets(int page, int size) {
        Pageable pageable = PageRequest.of(page-1, size, Sort.by("petId").descending());
        Page<Pet> petPage = petRepository.findAll(pageable);

        return petPage;
    }
    public Page<Pet> findPetByKeyword(int page, int size, Pet.PetSize petSize) {
        // keyword -> Pet.PetSize 타입
        Pageable pageable = PageRequest.of(page-1, size, Sort.by("petId").descending());

        Page<Pet> petPage = petRepository.findByPetSizeLike(pageable, petSize);

        return petPage;
    }
    public void deletePets(long petId) {
        petRepository.deleteById(petId);
    }
    // member안에 pet 정보에서 조회하도록 수정 해야 함
    private void verifyOverlapByPetName(String name) {
        Optional<Pet> optionalPet = petRepository.findByName(name);
        if(optionalPet.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.PET_EXISTS);
        }
    }

    private Pet findVerifiedPet(long petId) {
        Optional<Pet> optionalPet = petRepository.findById(petId);
        Pet findPet = optionalPet.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.PET_NOT_FOUND));

        return findPet;
    }

}
