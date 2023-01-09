package com.mainproject.server.domain.pet.repository;

import com.mainproject.server.domain.pet.entity.Pet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, Long> {
    Page<Pet> findByAboutDogContaining(Pageable pageable, String Keyword);
    Optional<Pet> findByName(String name);
}
