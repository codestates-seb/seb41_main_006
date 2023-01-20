package com.mainproject.server.helper.email;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;
    @PostMapping
    public ResponseEntity sendEmailVerifyCode(@RequestBody EmailDto emailDto) throws MessagingException {

        String verificationCode = emailService.sendEmail(emailDto.getEmail());
        Map<String, String> response = new HashMap<>();
        response.put("verificationCode", verificationCode);
        return new ResponseEntity(response, HttpStatus.OK);

    }
}
