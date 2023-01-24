package com.mainproject.server.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.server.auth.userdetails.MemberDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("Login Success, username={}", authentication.getPrincipal());
        //todo memberId 메세지 바디에 추가
        MemberDetails principal = (MemberDetails) authentication.getPrincipal();
        long memberId = principal.getMemberId();
        String email = principal.getEmail();
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("memberId", memberId);
        responseBody.put("email", email);

        ObjectMapper objectMapper = new ObjectMapper();
        response.setStatus(HttpStatus.OK.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(objectMapper.writeValueAsString(responseBody));
    }
}

