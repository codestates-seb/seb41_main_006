package com.mainproject.server.helper.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private final JavaMailSender emailSender;
    private final TemplateEngine templateEngine;

    public String sendEmail(String destEmail)  {
        String verificationCode = createVerificationCode();
        try {
            Context context = new Context();
            context.setVariable("verificationCode", verificationCode);

            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");


            String mailTemplate = templateEngine.process("mailTemplate", context);
            mimeMessageHelper.setFrom("seb41mainui@gmail.com");
            mimeMessageHelper.setTo(destEmail);
            mimeMessageHelper.setSubject("안녕하세요 킁킁메이트입니다. 회원 가입 이메일 인증 코드를 입력해주세요.");
            mimeMessageHelper.setText(mailTemplate, true);

            emailSender.send(mimeMessage);
            log.info("Success sending email");
        } catch (Exception e) {
            log.error("email send error={}", e.getMessage());
        }
        return verificationCode;
    }

    private String createVerificationCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for(int i=0;i<8;i++) {
            int index = random.nextInt(3);

            switch (index) {
                case 0 :
                    key.append((char) ((int)random.nextInt(26) + 97)); // a~z
                    break;
                case 1:
                    key.append((char) ((int)random.nextInt(26) + 65)); // A~Z
                    break;
                case 2:
                    key.append(random.nextInt(9)); // 0~9
                    break;
            }
        }
        return key.toString();
    }
}
