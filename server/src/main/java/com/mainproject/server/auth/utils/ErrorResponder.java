package com.mainproject.server.auth.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.server.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponder {
    public static void sendErrorResponse(HttpServletResponse response, HttpStatus httpStatus, String message) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.of(httpStatus, message);

        sendError(response, httpStatus, errorResponse);


    }

    public static void sendErrorResponse(HttpServletResponse response, HttpStatus httpStatus) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.of(httpStatus);

        sendError(response, httpStatus, errorResponse);
    }

    private static void sendError(HttpServletResponse response, HttpStatus httpStatus, ErrorResponse errorResponse) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String errorResponseBody = objectMapper.writeValueAsString(errorResponse);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("utf-8");
        response.setStatus(httpStatus.value());
        response.getWriter().write(errorResponseBody);
    }
}
