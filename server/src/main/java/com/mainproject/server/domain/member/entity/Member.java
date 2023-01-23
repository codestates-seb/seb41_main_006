package com.mainproject.server.domain.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mainproject.server.audit.Auditable;
import com.mainproject.server.awsS3.entity.S3UpFile;
import com.mainproject.server.domain.pet.entity.Pet;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Member extends Auditable implements Serializable {
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

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MemberAge memberAge;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;


    private String profileImage;

    private String aboutMe;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @JsonIgnore //pet-member 무한 조회 안되게 하는 어노테이션
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @BatchSize(size = 100)
    private List<Pet> pets = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "up_file_id")
    private S3UpFile s3UpFile;

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

    public enum MemberAge {
        TEENS("10대"),
        TWENTIES("20대"),
        THIRTIES("30대"),
        FORTIES("40대 이상");

        @Getter
        private String memberAge;

        MemberAge(String memberAge) {
            this.memberAge = memberAge;
        }
    }
}
