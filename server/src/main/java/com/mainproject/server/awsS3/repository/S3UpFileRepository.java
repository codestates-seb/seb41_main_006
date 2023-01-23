package com.mainproject.server.awsS3.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mainproject.server.awsS3.entity.S3UpFile;

public interface S3UpFileRepository extends JpaRepository<S3UpFile, Long> {
	Optional<S3UpFile> findByUpFileUrl(String upFileUrl);
	Optional<S3UpFile> findByUpFileId(Long upFileId);
}
