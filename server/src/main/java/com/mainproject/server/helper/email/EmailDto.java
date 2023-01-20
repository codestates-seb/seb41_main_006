package com.mainproject.server.helper.email;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class EmailDto {
    @Getter

    public static class Send {
        @Email
        @NotBlank
        private String email;
    }
    @Getter

    public static class Code {
        @NotBlank
        private String code;

        @Email
        @NotBlank
        private String email;
    }

}
