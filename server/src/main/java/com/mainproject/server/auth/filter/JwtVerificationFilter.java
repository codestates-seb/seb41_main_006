package com.mainproject.server.auth.filter;

import com.mainproject.server.auth.JwtTokenizer;
import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.auth.utils.CustomAuthorityUtils;
import com.mainproject.server.domain.member.entity.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException | ExpiredJwtException jwtException) {
            request.setAttribute("exception", jwtException);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader(JwtTokenizer.ACCESS_TOKEN_HEADER);

        return authorization == null || !authorization.startsWith(JwtTokenizer.TOKEN_PREFIX);
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader(JwtTokenizer.ACCESS_TOKEN_HEADER).replace(JwtTokenizer.TOKEN_PREFIX, "");

        // secret key로 지정한 문자열 base64로 인코딩
        String base64EncodedSecretKey = jwtTokenizer.encodeSecretKeyWithBase64(jwtTokenizer.getSecretKey());

        // base64 인코딩 된 secret key를 jws와 함께 getClaims()에 넘기면 secret key를 jwt 서명에 사용한 키로 바꿔주고
        // 검증 한 후에 claims를 꺼내온다.
        Claims claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        // claims로 생성한 MemberDetails 객체로 Authentication 객체를 생성하면 Security Context에 MemberDetails 저장 가능
        // @AuthenticationPrincipal 은 security Context에 저장된 principal를 불러오기 때문에 MemberDetails를 가져올 수 있음
        long memberId = Long.parseLong(String.valueOf(claims.get("memberId")));
        String username = (String) claims.get("username");
        List<String> roles = (List<String>)claims.get("roles");
        List<GrantedAuthority> authorities = customAuthorityUtils.createAuthorities(roles);

        Member member = new Member();
        member.setMemberId(memberId);
        member.setEmail(username);
        member.setRoles(roles);
        MemberDetails memberDetails = new MemberDetails(customAuthorityUtils, member);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(memberDetails, null, authorities);
        // 시큐리티 세션에 접근해서 Authentication 객체 저장
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }
}
