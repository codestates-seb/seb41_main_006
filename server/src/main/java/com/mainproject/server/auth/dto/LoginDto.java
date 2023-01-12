package com.mainproject.server.auth.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class LoginDto {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
}
