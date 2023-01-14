package com.mainproject.server.domain.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mainproject.server.audit.Auditable;
import com.mainproject.server.domain.pet.entity.Pet;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true)
    private String nickName;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false, length = 1)
    private String gender;

    @Column(nullable = false)
    private String address;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    private String profileImage;

    private String aboutMe;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @JsonIgnore //pet-member 무한 조회 안되게 하는 어노테이션
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pet> pets = new ArrayList<>();

    public void addPets(Pet pet) {
        this.pets.add(pet);
        if (pet.getMember() != this) {
            pet.setMember(this);
        }
    }

    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),

        MEMBER_SLEEP("휴면"),
        MEMBER_QUIT("탈퇴");

        @Getter
        private String memberStatus;
        MemberStatus(String memberStatus) {
            this.memberStatus = memberStatus;
        }
    }
}
