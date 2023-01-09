package com.mainproject.server.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.CONFLICT;

public enum ExceptionCode {
    MEMBER_ALREADY_EXISTS(CONFLICT.value(), "Member Already Exists"),
    PET_NOT_FOUND(404, "Pet Not Found"),
    PET_EXISTS(CONFLICT.value(), "Pet Exists" );

    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
