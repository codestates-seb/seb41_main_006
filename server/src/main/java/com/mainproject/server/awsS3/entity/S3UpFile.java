package com.mainproject.server.awsS3.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}
