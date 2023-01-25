package com.mainproject.server.helper.email;

import com.mainproject.server.domain.member.service.MemberService;
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
    private final MemberService memberService;
    @PostMapping
    public ResponseEntity sendEmailVerifyCode(@RequestBody EmailDto.Send requestBody) throws MessagingException{

        memberService.validateDuplicateEmail(requestBody.getEmail());
        emailService.sendEmail(requestBody.getEmail());

        return new ResponseEntity(HttpStatus.OK);

    }

    @PostMapping("/verification")
    public ResponseEntity verifyEmail(@RequestBody EmailDto.Code requestBody) {
        String email = requestBody.getEmail();
        String code = requestBody.getCode();
        emailService.verifyEmail(email, code);

        return new ResponseEntity(HttpStatus.OK);
    }
}
