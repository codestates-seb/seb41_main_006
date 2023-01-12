package com.mainproject.server.auth.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.server.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponder {
    public static void sendErrorResponse(HttpServletResponse response, HttpStatus httpStatus) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.of(httpStatus);

        ObjectMapper objectMapper = new ObjectMapper();

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(httpStatus.value());
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}
