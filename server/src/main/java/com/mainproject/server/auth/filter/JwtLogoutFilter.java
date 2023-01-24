package com.mainproject.server.auth.filter;

import com.mainproject.server.auth.JwtTokenizer;
import com.mainproject.server.auth.service.RedisService;
import com.mainproject.server.auth.utils.ErrorResponder;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
public class JwtLogoutFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;

    private final RedisService redisService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String requestURI = request.getRequestURI();
        String refreshToken = request.getHeader(JwtTokenizer.REFRESH_TOKEN_HEADER);

        return !request.getMethod().equals("POST")
                || !requestURI.equals("/auth/logout")
                || !StringUtils.hasText(refreshToken);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        // request로 부터 access token과 refresh token을 받는다.
        // redis에서 refresh token을 key로 가지는 데이터가 있는지 확인한다.
        // 해당 키-값 쌍 데이터를 제거한다.
        // access token 유효성 검증은 앞의 verification filter에서 진행
        // 로그아웃 된 토큰 검사도 verification filter에서 진행

        String accessToken = resolveAccessToken(request, response);
        String refreshToken = resolveRefreshToken(request, response);
        redisService.deleteRefreshToken(refreshToken);
        // access token payload 뽑기
        Jws<Claims> claims =
                jwtTokenizer.getClaims(accessToken,
                        jwtTokenizer.encodeSecretKeyWithBase64(jwtTokenizer.getSecretKey()));
        long remainExpiration = calculateRemainExpiration(claims);
        // access token 값을 키로 logout 문자열을 값으로 하는 데이터 레디스에 저장, 만료 시간 명시
        redisService.setAccessTokenLogout(accessToken, remainExpiration);


        response.setStatus(HttpStatus.OK.value());
        response.setCharacterEncoding("utf-8");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write("로그아웃 성공");
    }

    // access token 뽑기
    private String resolveAccessToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String bearerToken = request.getHeader(JwtTokenizer.ACCESS_TOKEN_HEADER);
        if (!StringUtils.hasText(bearerToken) || !bearerToken.startsWith(JwtTokenizer.TOKEN_PREFIX)) {
            log.info("Header hasn't contain access token, Authorization: {}", bearerToken);
            ErrorResponder.sendErrorResponse(response, HttpStatus.BAD_REQUEST);
        }
        return bearerToken.replace(JwtTokenizer.TOKEN_PREFIX, "");
    }

    // refresh token 뽑기
    private String resolveRefreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String refreshToken = request.getHeader(JwtTokenizer.REFRESH_TOKEN_HEADER);
        if (!StringUtils.hasText(refreshToken)) {
            log.info("Header hasn't contain refresh token, Refresh: {}", refreshToken);
            ErrorResponder.sendErrorResponse(response, HttpStatus.BAD_REQUEST);
        }
        return refreshToken;
    }

    // 만료시간 계산
    private long calculateRemainExpiration(Jws<Claims> claims) {
        return claims.getBody().getExpiration().getTime() - new Date().getTime();
    }
}
