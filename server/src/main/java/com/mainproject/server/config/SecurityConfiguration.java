package com.mainproject.server.config;

import com.mainproject.server.auth.JwtTokenizer;
import com.mainproject.server.auth.filter.JwtAuthenticationFilter;
import com.mainproject.server.auth.filter.JwtLogoutFilter;
import com.mainproject.server.auth.filter.JwtReissueFilter;
import com.mainproject.server.auth.filter.JwtVerificationFilter;
import com.mainproject.server.auth.handler.MemberAccessDeniedHandler;
import com.mainproject.server.auth.handler.MemberAuthenticationEntryPoint;
import com.mainproject.server.auth.handler.MemberAuthenticationFailureHandler;
import com.mainproject.server.auth.handler.MemberAuthenticationSuccessHandler;
import com.mainproject.server.auth.service.RedisService;
import com.mainproject.server.auth.userdetails.MemberDetailsService;
import com.mainproject.server.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final RedisService redisService;
    private final MemberDetailsService memberDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.headers().frameOptions().sameOrigin();
        // cors 설정
        http.cors().configurationSource(corsConfigurationSource());
        // 세션 사용 x
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.csrf().disable()
                .httpBasic().disable() // http basic 인증 방식 사용 x
                .formLogin().disable() // form login 인증 방식 사용 x
                .logout().disable();
        // jwt 인증 필터 적용
        http.apply(new CustomFilterConfigurer());
        // jwt 검증 실패 예외처리 및 권한 예외처리
        http.exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler());
        // todo api 권한 이렇게 해도 될까...
        http.authorizeHttpRequests()
                .antMatchers("/h2/**").permitAll()
                .antMatchers(HttpMethod.POST, "/members", "/login", "/reissue").permitAll()
                .antMatchers(HttpMethod.GET, "/members/{member-id:[\\d]+}",
                        "/members*", "/pets/*", "boards/*", "/comments*").permitAll()
                .anyRequest().authenticated();

//                .antMatchers("/members/**/my-page", "/members/**/posts").authenticated()
//                .antMatchers(HttpMethod.DELETE, "/members/{member-id:[\\d]+}").hasRole("ROLE_USER")
//                .antMatchers("/logout").authenticated()
//                .anyRequest().authenticated();

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.addAllowedOrigin("*");
//        모든 origin 허용
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Refresh"));
        configuration.setMaxAge(3600L);
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", configuration);

        return urlBasedCorsConfigurationSource;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, redisService);
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");

            JwtVerificationFilter jwtVerificationFilter =
                    new JwtVerificationFilter(jwtTokenizer, customAuthorityUtils,redisService);

            JwtReissueFilter jwtReissueFilter = new JwtReissueFilter(redisService, jwtTokenizer, memberDetailsService);

            JwtLogoutFilter jwtLogoutFilter = new JwtLogoutFilter(jwtTokenizer, redisService);

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
                    .addFilterAfter(jwtReissueFilter, JwtVerificationFilter.class)
                    .addFilterAfter(jwtLogoutFilter, JwtVerificationFilter.class);
        }
    }
}
