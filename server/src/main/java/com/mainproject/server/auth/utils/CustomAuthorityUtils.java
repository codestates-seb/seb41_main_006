package com.mainproject.server.auth.utils;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {
    private final List<String> USER_ROLE = List.of("ROLE_USER");

    /* 회원 role 생성
    todo 게스트 role 나중에 생각해보기, 관리자는?
     */
    public List<String> createRole() {
        return this.USER_ROLE;
    }

    /* 회원 권한 생성*/
    public List<GrantedAuthority> createAuthorities(List<String> roles) {
        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
