package com.mainproject.server.awsS3.entity;

import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.pet.entity.Pet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class S3UpFile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long upFileId;

	@Column
	private String upFileName;

	@Column
	private String upFileUrl;

	@OneToOne(mappedBy = "s3UpFile")
	private Member member;

	@OneToOne(mappedBy = "s3UpFile")
	private Pet pet;
}
