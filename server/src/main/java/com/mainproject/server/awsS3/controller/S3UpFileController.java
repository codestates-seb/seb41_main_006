package com.mainproject.server.awsS3.controller;

import java.io.IOException;

import javax.validation.constraints.Positive;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.awsS3.dto.S3UpFileResponse;
import com.mainproject.server.awsS3.entity.S3UpFile;
import com.mainproject.server.awsS3.mapper.S3UpFileMapper;
import com.mainproject.server.awsS3.service.S3UpFileService;
import com.mainproject.server.exception.ExceptionCode;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/s3")
@RequiredArgsConstructor
@CrossOrigin
public class S3UpFileController {
	private final S3UpFileService s3UpFileService;
	private final S3UpFileMapper s3UpFileMapper;

	//멤버 file upload
	@PostMapping("/member")
	public ResponseEntity uploadMFile(@RequestParam("images")MultipartFile multipartFile,
									  @AuthenticationPrincipal MemberDetails memberDetails) throws IOException{

		if(memberDetails == null){
			return new ResponseEntity(ExceptionCode.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
		}
		S3UpFile uploadMfile = s3UpFileService.uploadMFile(multipartFile, memberDetails);
		S3UpFileResponse response = s3UpFileMapper.s3UpMFileToS3UpMFileResponse(uploadMfile);

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	//펫 file upload
	@PostMapping("/pet/{pet-id}")
	public ResponseEntity uploadPFile(@RequestParam("images")MultipartFile multipartFile,
		                      @Positive @PathVariable("pet-id") Long petId) throws IOException{

		if(petId == null){
			return new ResponseEntity(ExceptionCode.PET_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		S3UpFile uploadPfile = s3UpFileService.uploadPFile(multipartFile, petId);
		S3UpFileResponse response = s3UpFileMapper.s3UpPFileToS3UpPFileResponse(uploadPfile);

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	//멤버 file delete
	@DeleteMapping("/member")
	public ResponseEntity deleteMFile(@RequestParam("upFileUrl") String upFileUrl) throws IOException{

		s3UpFileService.deleteMFile(upFileUrl);
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}

	//펫 file delete
	@DeleteMapping("/pet")
	public ResponseEntity deletePFile(@RequestParam("upFileUrl") String upFileUrl) throws IOException{

		s3UpFileService.deletePFile(upFileUrl);
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
}
