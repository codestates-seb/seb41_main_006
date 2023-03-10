package com.mainproject.server.domain.pet.repository;

import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.pet.entity.Pet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, Long> {
    Page<Pet> findByPetSizeLike(Pageable pageable, @Param("search") Pet.PetSize petSize);
    Optional<Pet> findByName(String name);

    Page<Pet> findByMember(Pageable pageable, Member member);
}
