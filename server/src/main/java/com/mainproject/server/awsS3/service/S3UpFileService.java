package com.mainproject.server.awsS3.service;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.awsS3.dto.S3UpFileResponse;
import com.mainproject.server.awsS3.entity.S3UpFile;
import com.mainproject.server.awsS3.mapper.S3UpFileMapper;
import com.mainproject.server.awsS3.repository.S3UpFileRepository;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.service.MemberService;
import com.mainproject.server.domain.pet.entity.Pet;
import com.mainproject.server.domain.pet.service.PetService;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin
@RequiredArgsConstructor
@Service
@Slf4j
public class S3UpFileService {
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Value("${cloud.aws.s3.endpoint}")
	private String s3EndPoint;

	private final AmazonS3 amazonS3;
	private final S3UpFileRepository s3UpFileRepository;

	//멤버 사진 업로드
	public S3UpFile uploadMFile(MultipartFile multipartFile) throws IOException{
		String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();

		ObjectMetadata objMeta = new ObjectMetadata();
		objMeta.setContentLength(multipartFile.getInputStream().available());

		amazonS3.putObject(bucket + "member", s3FileName, multipartFile.getInputStream(), objMeta);

		S3UpFile s3UpFiles = new S3UpFile();
		s3UpFiles.setUpFileName(s3FileName);
		s3UpFiles.setUpFileUrl(s3EndPoint + "/member/" + s3FileName);
		s3UpFileRepository.save(s3UpFiles);

		log.info("파일 업로드됨");
		return s3UpFileRepository.save(s3UpFiles);
	}

	//펫 사진 업로드
	public S3UpFile uploadPFile(MultipartFile multipartFile) throws IOException {
		String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();

		ObjectMetadata objMeta = new ObjectMetadata();
		objMeta.setContentLength(multipartFile.getInputStream().available());

		amazonS3.putObject(bucket + "pet", s3FileName, multipartFile.getInputStream(), objMeta);

		S3UpFile s3UpFiles = new S3UpFile();
		s3UpFiles.setUpFileName(s3FileName);
		s3UpFiles.setUpFileUrl(s3EndPoint + "/pet/" + s3FileName);
		s3UpFileRepository.save(s3UpFiles);

		log.info("파일 업로드됨");
		return s3UpFileRepository.save(s3UpFiles);
	}

	//멤버 사진 url 삭제
	public String deleteMFile(String upFileUrl) throws IOException{
		S3UpFile s3UpFile = findVerifiedUpFileUrl(upFileUrl);
		String fileName = s3UpFile.getUpFileName();
		try{
			s3UpFileRepository.delete(s3UpFile);
			amazonS3.deleteObject(new DeleteObjectRequest(bucket + "member", fileName));
		} catch (AmazonServiceException e){
			System.err.println(e.getErrorMessage());
		}
		return "파일 삭제됨";
	}

	//펫 사진 url 삭제
	public String deletePFile(String upFileUrl) throws IOException{
		S3UpFile s3UpFile = findVerifiedUpFileUrl(upFileUrl);
		String fileName = s3UpFile.getUpFileName();
		try{
			s3UpFileRepository.delete(s3UpFile);
			amazonS3.deleteObject(new DeleteObjectRequest(bucket + "pet", fileName));
		} catch (AmazonServiceException e){
			System.err.println(e.getErrorMessage());
		}
		return "파일 삭제됨";
	}

	//존재하는 url인지 검증
	public S3UpFile findVerifiedUpFileUrl (String upFileUrl){
		Optional<S3UpFile> optionalS3UpFile = s3UpFileRepository.findByUpFileUrl(upFileUrl);
		S3UpFile findS3UpFile =
			optionalS3UpFile.orElseThrow(() -> new BusinessLogicException(ExceptionCode.S3_FILE_NOT_FOUND));

		return findS3UpFile;
	}

	//존재하는 id 인지 검증
	public S3UpFile validateVerifyFile(Long upFileId){
		Optional<S3UpFile> optionalS3UpFile = s3UpFileRepository.findByUpFileId(upFileId);
		S3UpFile findS3UpFile = optionalS3UpFile.orElseThrow(
			() -> new BusinessLogicException(ExceptionCode.S3_FILE_NOT_FOUND));

		return findS3UpFile;
	}
}
