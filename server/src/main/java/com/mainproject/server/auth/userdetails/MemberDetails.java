package com.mainproject.server.auth.userdetails;

import com.mainproject.server.auth.utils.CustomAuthorityUtils;
import com.mainproject.server.domain.member.entity.Member;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
public class MemberDetails implements UserDetails {

    private CustomAuthorityUtils authorityUtils;
    private long memberId;
    private String email;
    private String password;
    private List<String> roles;

    public MemberDetails(CustomAuthorityUtils authorityUtils, Member member) {
        this.authorityUtils = authorityUtils;
        this.memberId = member.getMemberId();
        this.email = member.getEmail();
        this.password = member.getPassword();
        this.roles = member.getRoles();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorityUtils.createAuthorities(roles);
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
