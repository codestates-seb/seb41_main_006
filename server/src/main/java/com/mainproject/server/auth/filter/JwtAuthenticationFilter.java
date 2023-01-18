package com.mainproject.server.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.server.auth.JwtTokenizer;
import com.mainproject.server.auth.dto.LoginDto;
import com.mainproject.server.auth.service.RedisService;
import com.mainproject.server.auth.userdetails.MemberDetails;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/*loginfrom 인증 방식 비활성화 해서 현재 시큐리티 필터 체인에 UsernamePasswordAuthenticationFilter가 없음
 * UsernamePasswordAuthenticationFilter 상속해서 인증 필터 만듦*/
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationmanager;
    private final JwtTokenizer jwtTokenizer;

    private final RedisService redisService;

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        ObjectMapper objectMapper = new ObjectMapper();
        ServletInputStream inputStream = request.getInputStream();
        String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);

        LoginDto loginDto = objectMapper.readValue(messageBody, LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        // authentication 객체가 security context에 저장됨
        return authenticationmanager.authenticate(authenticationToken);

    }
    /*인증 성공시 실행*/
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        MemberDetails member = (MemberDetails) authResult.getPrincipal();

        String base64EncodedSecretKey = jwtTokenizer.encodeSecretKeyWithBase64(jwtTokenizer.getSecretKey());
        String accessToken = delegateAccessToken(member, base64EncodedSecretKey); // access token 생성
        String refreshToken = delegateRefreshToken(member, base64EncodedSecretKey); // refresh token 생성

        response.addHeader(JwtTokenizer.ACCESS_TOKEN_HEADER, JwtTokenizer.TOKEN_PREFIX + accessToken);
        response.addHeader(JwtTokenizer.REFRESH_TOKEN_HEADER, refreshToken);

        /*현재 refresh token을 키로 하는 데이터가 없으면 refresh token 레디스에 저장*/
        if (redisService.getRefreshToken(refreshToken) == null) {
            redisService.setRefreshToken(refreshToken, member.getEmail(), jwtTokenizer.getRefreshTokenExpirationMinutes());
            log.info("Set refresh token in Redis");
        }

        this.getSuccessHandler().onAuthenticationSuccess(request,response,authResult);
    }

    private String delegateAccessToken(MemberDetails member, String base64EncodedSecretKey) {
        /*payload에 memberId, email, roles 추가*/
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getMemberId());
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date tokenExpiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, tokenExpiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(MemberDetails member, String base64EncodedSecretKey) {
        String subject = member.getEmail();
        Date tokenExpiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String refreshToken = jwtTokenizer.generateRefreshToken(subject, tokenExpiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
