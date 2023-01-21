package com.mainproject.server.awsS3.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class S3UpFileResponse {
	private Long upFileId;
	private String upFileName;
	private String upFileUrl;
}
