package com.mainproject.server.awsS3.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mainproject.server.awsS3.service.S3UpFileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/s3")
@RequiredArgsConstructor
@CrossOrigin
public class S3UpFileController {
	private final S3UpFileService s3UpFileService;

	//멤버 file upload
	@PostMapping("/member")
	public String uploadMFile(@RequestParam("images")MultipartFile multipartFile) throws IOException{

		return s3UpFileService.uploadMFile(multipartFile);
	}

	//펫 file upload
	@PostMapping("/pet")
	public String uploadPFile(@RequestParam("images")MultipartFile multipartFile) throws IOException{

		return s3UpFileService.uploadPFile(multipartFile);
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
