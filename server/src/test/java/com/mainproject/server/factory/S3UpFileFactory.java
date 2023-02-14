package com.mainproject.server.factory;

import com.mainproject.server.awsS3.dto.S3UpFileResponse;
import com.mainproject.server.awsS3.entity.S3UpFile;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.pet.entity.Pet;

public class S3UpFileFactory {
    public static S3UpFile createS3UpFile(Member member, Pet pet) {
        S3UpFile s3UpFile =
                new S3UpFile(1L, "강아지 이미지", "URL", member, pet);
        return s3UpFile;
    }
    public static S3UpFileResponse createMemberS3Response() {
        S3UpFileResponse response = S3UpFileResponse.builder()
                .upFileId(1L)
                .upFileName("사람 이미지")
                .upFileUrl("URL")
                .build();
        return response;
    }

    public static S3UpFileResponse createPetS3Response() {
        S3UpFileResponse response = S3UpFileResponse.builder()
                .upFileId(2L)
                .upFileName("강아지 이미지")
                .upFileUrl("URL")
                .build();
        return response;
    }
}
