package com.mainproject.server.awsS3.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.mainproject.server.awsS3.dto.S3UpFileResponse;
import com.mainproject.server.awsS3.entity.S3UpFile;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface S3UpFileMapper {

	@Mapping(source = "member.memberId", target = "memberId")
	default S3UpFileResponse s3UpMFileToS3UpMFileResponse(S3UpFile s3UpFile){
		S3UpFileResponse responseDto = S3UpFileResponse
			.builder()
			.upFileId(s3UpFile.getUpFileId())
			.upFileName(s3UpFile.getUpFileName())
			.upFileUrl(s3UpFile.getUpFileUrl())
			.memberId(s3UpFile.getMember().getMemberId())
			.build();

		return responseDto;
	}

	@Mapping(source = "pet.petId", target = "petId")
	default S3UpFileResponse s3UpPFileToS3UpPFileResponse(S3UpFile s3UpFile){
		S3UpFileResponse responseDto = S3UpFileResponse
			.builder()
			.upFileId(s3UpFile.getUpFileId())
			.upFileName(s3UpFile.getUpFileName())
			.upFileUrl(s3UpFile.getUpFileUrl())
			.petId(s3UpFile.getPet().getPetId())
			.build();

		return responseDto;
	}

}
