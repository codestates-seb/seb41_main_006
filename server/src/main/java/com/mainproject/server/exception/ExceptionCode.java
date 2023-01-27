package com.mainproject.server.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

public enum ExceptionCode {
    MEMBER_ALREADY_EXISTS(CONFLICT.value(), "Member Already Exists"),
    NICKNAME_ALREADY_EXISTS(CONFLICT.value(), "NickName Already Exists"),

    MEMBER_NOT_FOUND(NOT_FOUND.value(), "Member Not Found"),
    PET_NOT_FOUND(404, "Pet Not Found"),
    PET_EXISTS(CONFLICT.value(), "Pet Exists" ),
    BOARD_NOT_FOUND(NOT_FOUND.value(),"Board not Found"),
    COMMENTS_NOT_FOUND(404, "Comment Not Found"),
    CHATROOM_NOT_FOUND(NOT_FOUND.value(), "ChatRoom Not Found"),
    NOT_AUTHORIZED(UNAUTHORIZED.value(), "Not Authorized"),
    EMAIL_VERIFICATION_FAILED(BAD_REQUEST.value(), "Code Has Not Matched"),

    S3_FILE_NOT_FOUND(NOT_FOUND.value(), "There are no images stored in S3.");

    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
