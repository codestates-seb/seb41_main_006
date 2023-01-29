package com.mainproject.server.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.server.auth.utils.ErrorResponder;
import com.mainproject.server.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        log.error("# Authentication failed: {}, {}", exception.getMessage(), exception.getClass());

        ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED, exception.getMessage());
    }
}
