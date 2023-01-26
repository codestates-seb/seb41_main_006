package com.mainproject.server.auth.filter;

import com.mainproject.server.auth.JwtTokenizer;
import com.mainproject.server.auth.service.RedisService;
import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.auth.userdetails.MemberDetailsService;
import com.mainproject.server.auth.utils.ErrorResponder;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import io.netty.util.internal.StringUtil;
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
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class JwtReissueFilter extends OncePerRequestFilter {
    private final RedisService redisService;
    private final JwtTokenizer jwtTokenizer;

    private final MemberDetailsService memberDetailsService;

    /*해당 조건에 따라 filter를 탈지 말지 결정*/
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        String refreshToken = request.getHeader(JwtTokenizer.REFRESH_TOKEN_HEADER);
        // 엑세스 토큰 필요한가?

        // reissue 경로가 아닌 경우 혹은 refresh 값이 빈 문자열이거나 null인 경우
        return !request.getMethod().equals("POST")
                || !path.equals("/auth/reissue")
                || !StringUtils.hasText(refreshToken);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String refreshToken = request.getHeader(JwtTokenizer.REFRESH_TOKEN_HEADER);
        log.info("refreshToken={}", refreshToken);
        try {
            //refresh token 유효성 검증
            jwtTokenizer.getClaims(refreshToken,
                    jwtTokenizer.encodeSecretKeyWithBase64(jwtTokenizer.getSecretKey()));
            String memberEmail = redisService.getRefreshToken(refreshToken);
            MemberDetails memberDetails = (MemberDetails) memberDetailsService.loadUserByUsername(memberEmail);
            //base64 인코딩된 시크릿 키 가져오기
            String base64EncodedSecretKey = jwtTokenizer.encodeSecretKeyWithBase64(jwtTokenizer.getSecretKey());
            String accessToken = delegateAccessToken(memberDetails, base64EncodedSecretKey);

            response.setHeader(JwtTokenizer.ACCESS_TOKEN_HEADER, JwtTokenizer.TOKEN_PREFIX + accessToken);
            response.setCharacterEncoding("utf-8");
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter().write("재발급 성공");

        }  catch (Exception exception) {
            ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED, exception.getMessage());
        }
    }

    /*access 토큰 생성*/
    private String delegateAccessToken(MemberDetails memberDetails, String base64EncodedSecretKey) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", memberDetails.getMemberId());
        claims.put("username", memberDetails.getEmail());
        claims.put("roles", memberDetails.getRoles());

        String subject = memberDetails.getEmail();
        Date tokenExpiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, tokenExpiration, base64EncodedSecretKey);

        return accessToken;
    }
}
