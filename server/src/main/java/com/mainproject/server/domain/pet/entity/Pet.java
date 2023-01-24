package com.mainproject.server.domain.pet.entity;

import com.mainproject.server.audit.Auditable;
import com.mainproject.server.awsS3.entity.S3UpFile;
import com.mainproject.server.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@Setter
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

    @Column(nullable = false)
    private String breed;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne
    @JoinColumn(name = "up_file_id")
    private S3UpFile s3UpFile;

    public void setMember(Member member) {
        this.member = member;
        if (!member.getPets().contains(this)) {
            member.getPets().add(this);
        }
    }

    public void setPet(Pet pet){
        this.petId = petId;
    }

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
