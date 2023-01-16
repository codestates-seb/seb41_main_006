package com.mainproject.server.auth.service;

import com.mainproject.server.auth.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@Slf4j
@RequiredArgsConstructor
public class RedisService {
    private final RedisTemplate<String, String> redisTemplate;
    private final JwtTokenizer jwtTokenizer;

    /*key(refresh token)-value(user email) 저장*/
    public void setRefreshToken(String refreshToken, String email, long expirationMinutes) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        // refresh token 만료시간 이후 삭제
        valueOperations.set(refreshToken, email, Duration.ofMinutes(expirationMinutes));
    }

    /*저장된 refresh token 가져오기*/
    public String getRefreshToken(String refreshToken) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        // refresh token 없으면 null 반환
        return valueOperations.get(refreshToken);
    }

    /*저장된 refresh token 삭제(로그아웃 구현 시 사용)*/
    public void deleteRefreshToken(String refreshToken) {
        redisTemplate.delete(refreshToken);
    }
}
