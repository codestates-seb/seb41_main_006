package com.mainproject.server.helper.email;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
@RequestMapping("/auth/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;
    @PostMapping
    public ResponseEntity sendEmailVerifyCode(@RequestBody EmailDto.Send requestBody) throws MessagingException{

        emailService.sendEmail(requestBody.getEmail());

        return new ResponseEntity(HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity verifyEmail(@RequestBody EmailDto.Code requestBody) {
        String email = requestBody.getEmail();
        String code = requestBody.getCode();
        emailService.verifyEmail(email, code);

        return new ResponseEntity(HttpStatus.OK);
    }
}
