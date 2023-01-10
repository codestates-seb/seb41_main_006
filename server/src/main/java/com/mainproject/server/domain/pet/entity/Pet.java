package com.mainproject.server.domain.pet.entity;

import com.mainproject.server.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import java.lang.reflect.Member;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Pet extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long petId;

    @Column(nullable = false, length = 10)
    private String name;

    @Column(nullable = false, length = 3)
    private String age;

    @Column(nullable = false, length = 1)
    private String gender;

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
        DOG_S("소형견"),
        DOG_M("중형견"),
        DOG_L("대형견");

        private String status;

        PetSize(String status) {
            this.status = status;
        }
    }

}
