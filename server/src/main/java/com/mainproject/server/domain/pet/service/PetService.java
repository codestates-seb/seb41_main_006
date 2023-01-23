package com.mainproject.server.domain.pet.service;

import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PetService {
    private final PetRepository petRepository;
    private final MemberService memberService;

    public Pet createPet(Pet pet, MemberDetails memberDetails) {

        verifyOverlapByPetName(pet.getName(), memberDetails.getMemberId());

        Member member = memberService.validateVerifyMember(memberDetails.getMemberId());

        pet.setMember(member);

        return petRepository.save(pet);
    }
    public Pet updatePet(Pet pet, MemberDetails memberDetails) {

        Pet findPet = findVerifiedPet(pet.getPetId());

        verifyPetOwner(findPet, memberDetails.getMemberId());

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
        // findPet에는 Member 정보가 있는데 response에는 member가 null로 뜸...
    }
    @Transactional(readOnly = true)
    public Pet findPet(long petId) {
        return findVerifiedPet(petId);
    }
    @Transactional(readOnly = true)
    public Page<Pet> findPets(int page, int size) {
        Pageable pageable = PageRequest.of(page-1, size, Sort.by("petId").descending());
        Page<Pet> petPage = petRepository.findAll(pageable);

        return petPage;
    }

    @Transactional(readOnly = true)
    public Page<Pet> findMyPets(int page, int size, MemberDetails memberDetails) {

        Pageable pageable = PageRequest.of(page-1, size, Sort.by("petId").descending());

        Member member = memberService.validateVerifyMember(memberDetails.getMemberId());

        Page<Pet> petPage = petRepository.findByMember(pageable, member);
        return petPage;
    }

    @Transactional(readOnly = true)
    public Page<Pet> findPetByPetSize(int page, int size, Pet.PetSize petSize) {
        // keyword -> Pet.PetSize 타입
        Pageable pageable = PageRequest.of(page-1, size, Sort.by("petId").descending());

        Page<Pet> petPage = petRepository.findByPetSizeLike(pageable, petSize);

        return petPage;
    }
    public void deletePets(long petId, MemberDetails memberDetails) {
        Pet findPet = findVerifiedPet(petId);

        verifyPetOwner(findPet, memberDetails.getMemberId());

        petRepository.delete(findPet);
    }
    // 회원 정보에 같은 이름을 가진 강아지 정보가 있으면 PET_EXISTS
    private void verifyOverlapByPetName(String name, long memberId) {
        Member member = memberService.validateVerifyMember(memberId);
        List<Pet> pets = member.getPets().stream()
                .filter(pet -> pet.getName().equals(name))
                .collect(Collectors.toList());

        if(!pets.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.PET_EXISTS);
        }

    }

    public Pet findVerifiedPet(long petId) {
        Optional<Pet> optionalPet = petRepository.findById(petId);
        Pet findPet = optionalPet.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.PET_NOT_FOUND));

        return findPet;
    }
    // 요청하는 member가 강아지의 주인이 맞는지 검증하는 메서드
    private void verifyPetOwner(Pet pet, long memberId) {

        if(pet.getMember().getMemberId() != memberId) {
            throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED);
        }
    }
}
