package com.mainproject.server.domain.pet.entity;

import lombok.*;

import javax.persistence.*;
import java.lang.reflect.Member;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long petId;

    @Column(nullable = false, length = 10)
    private String name;

    @Column(nullable = false)
    private String age;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private PetSize petSize;

    @Column(nullable = false)
    private boolean neutered;

    @Column
    private String aboutDog;

    @Column
    private byte[] petImage; // 프로필 사진 어떻게?

    @Column(nullable = false)
    private String breed;

    public enum PetSize {
        DOG_S,
        DOG_M,
        DOG_L
    }

}
