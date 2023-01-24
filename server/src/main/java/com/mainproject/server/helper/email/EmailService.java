package com.mainproject.server.helper.email;

import com.mainproject.server.auth.service.RedisService;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private final JavaMailSender emailSender;
    private final TemplateEngine templateEngine;

    private final RedisService redisService;

    public String sendEmail(String destEmail) throws MessagingException {
        String verificationCode = createVerificationCode();
        Context context = new Context();
        context.setVariable("verificationCode", verificationCode);

        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");


        String mailTemplate = templateEngine.process("mailTemplate", context);
        mimeMessageHelper.setTo(destEmail);
        mimeMessageHelper.setSubject("안녕하세요 킁킁메이트입니다. 회원 가입 이메일 인증 코드를 입력해주세요.");
        mimeMessageHelper.setText(mailTemplate, true);

        emailSender.send(mimeMessage);
        redisService.setVerificationCode(destEmail, verificationCode);
        log.info("Success sending email");

        return verificationCode;
    }

    private String createVerificationCode() {
        Random random = new Random();
        String code = null;

        while (code == null || isDuplicateCode(code)) {
            StringBuilder codeBuilder = new StringBuilder();
            for (int i = 0; i < 8; i++) {
                int index = random.nextInt(3);

                switch (index) {
                    case 0:
                        codeBuilder.append((char) ((int) random.nextInt(26) + 97)); // a~z
                        break;
                    case 1:
                        codeBuilder.append((char) ((int) random.nextInt(26) + 65)); // A~Z
                        break;
                    case 2:
                        codeBuilder.append(random.nextInt(9)); // 0~9
                        break;
                }
            }
            code = codeBuilder.toString();
        }

        return code;
    }

    private boolean isDuplicateCode(String code) {
        return redisService.isExistsCode(code);
    }

    public void verifyEmail(String email, String code) {
        if (!email.equals(redisService.getEmailForCode(code))) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_VERIFICATION_FAILED);
        }
    }
}
