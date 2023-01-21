package com.mainproject.server.awsS3.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.mainproject.server.awsS3.entity.S3UpFile;
import com.mainproject.server.awsS3.repository.S3UpFileRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin
@RequiredArgsConstructor
@Service
@Slf4j
public class S3UpFileService {
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Value("${cloud.aws.s3.member}")
	private String urlMemberImage;

	@Value("${cloud.aws.s3.pet}")
	private String urlPetImage;

	private final AmazonS3 amazonS3;
	private final S3UpFileRepository s3UpFileRepository;

	//멤버 사진 업로드
	public String uploadMFile(MultipartFile multipartFile) throws IOException{
		String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();

		ObjectMetadata objMeta = new ObjectMetadata();
		objMeta.setContentLength(multipartFile.getInputStream().available());

		amazonS3.putObject(bucket + "member", s3FileName, multipartFile.getInputStream(), objMeta);

		S3UpFile s3UpFiles = new S3UpFile();
		s3UpFiles.setUpFileName(s3FileName);
		s3UpFiles.setUpFileUrl(urlMemberImage + s3FileName);
		s3UpFileRepository.save(s3UpFiles);

		return s3UpFiles.getUpFileUrl();
	}

	//펫 사진 업로드
	public String uploadPFile(MultipartFile multipartFile) throws IOException{

		return null;
	}

	//멤버 사진 url 삭제
	public String deleteMFile(String upFileName) throws IOException{

		return "파일 삭제됨";
	}

	//펫 사진 url 삭제
	public String deletePFile(String upFileName) throws IOException{

		return "파일 삭제됨";
	}

	//존재하는 url인지 검증
	public S3UpFile findVerifiedUpFileUrl (String upFileUrl){

		return null;
	}
}
