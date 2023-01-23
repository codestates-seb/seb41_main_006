package com.mainproject.server.awsS3.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.mainproject.server.awsS3.dto.S3UpFileResponse;
import com.mainproject.server.awsS3.entity.S3UpFile;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface S3UpFileMapper {

//	default S3UpFileResponse s3UpFileToS3UpFileResponse(S3UpFile s3UpFile){
//		S3UpFileResponse responseDto = S3UpFileResponse
//			.builder()
//			.upFileId(s3UpFile.getUpFileId())
//			.upFileName(s3UpFile.getUpFileName())
//			.upFileUrl(s3UpFile.getUpFileUrl())
//			.build();
//
//		return responseDto;
//	}

	S3UpFileResponse s3UpFileToS3UpFileResponse(S3UpFile s3UpFile);
}
