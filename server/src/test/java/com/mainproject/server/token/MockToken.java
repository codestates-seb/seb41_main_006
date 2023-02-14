package com.mainproject.server.token;

import org.springframework.http.HttpHeaders;

public class MockToken {
    private static final String AUTHORIZATION = "Authorization";
    private static final String REFRESH_TOKEN = "RefreshToken";

    public static String createMockAccessToke() {
        return "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwibWVtYmVySWQiOjEsInVzZXJuYW1lIjoidGVzdDFAZ21haWwuY29tIiwic3ViIjoidGVzdDFAZ21haWwuY29tIiwiaWF0IjoxNjc1MzM4NTEzLCJleHAiOjE2NzUzMzkxMTN9.JX6msl2NpGxllZtBiYbYkIothC55QwAlWlfINJ33sHI";
    }

    public static HttpHeaders getMockToken() {
        HttpHeaders headers = new HttpHeaders();
        headers.add(AUTHORIZATION, createMockAccessToke());
        return headers;
    }
}
