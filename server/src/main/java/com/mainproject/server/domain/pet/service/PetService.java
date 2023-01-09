package com.mainproject.server.domain.pet.service;

import com.mainproject.server.domain.pet.entity.Pet;
import com.mainproject.server.domain.pet.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
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
    public Page<Pet> findPetByKeyword(int page, int size, String keyword) {
        // 정렬 기준을 어떻게 할 것인지?
        Pageable pageable = PageRequest.of(page-1, size, Sort.by("petId").ascending());
        Page<Pet> petPage = petRepository.findByAboutDogContaining(pageable, keyword);

        return petPage;
    }
    public void deletePets(long petId) {
        petRepository.deleteById(petId);
    }
    // member안에 pet 정보에서 조회하도록 수정 해야 함
    private void verifyOverlapByPetName(String name) {
        Optional<Pet> optionalPet = petRepository.findByName(name);
        if(optionalPet.isPresent()) {
//            throw new BusinessLogicException(ExceptionCode.PET_EXISTS);
        }
    }

    private Pet findVerifiedPet(long petId) {
        Optional<Pet> optionalPet = petRepository.findById(petId);
        Pet findPet = optionalPet.orElseThrow(
//                () -> new BusinessLogicException(ExceptionCode.PET_NOT_FOUND)
                ()-> new RuntimeException("해당 아이디를 가진 강아지 정보를 찾을 수 없습니다."));

        return findPet;
    }

}
