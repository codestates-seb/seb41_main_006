package com.mainproject.server.domain.member.service;

import com.mainproject.server.auth.utils.CustomAuthorityUtils;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.repository.MemberRepository;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.utils.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Member> customBeanUtils;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;

    /*회원 신규 가입*/
    public Member createMember(Member member) {
        validateDuplicateMember(member);
        // 비밀번호 암호화
        String encodePassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodePassword);
        // 권한 정보 세팅
        member.setRoles(customAuthorityUtils.createRole());

        return memberRepository.save(member);
    }

    /*마이페이지 정보 수정*/
    public Member updateMypageInfo(long memberId, Member member) {
        Member findMember = validateVerifyMember(memberId);
        Member updatedMember = customBeanUtils.copyNonNullProperties(member, findMember);

        return memberRepository.save(updatedMember);
    }

    /*해당 주소를 가지고 있는 회원들 조회*/
    @Transactional(readOnly = true)
    public Page<Member> findMembersWithAddress(String address, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return memberRepository.findByAddress(address, pageRequest);
    }

    /*회원 정보 조회*/
    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
         return validateVerifyMember(memberId);
    }

    /*회원 탈퇴*/
    public void deleteMember(long memberId) {
        Member member = validateVerifyMember(memberId);
        member.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);

        memberRepository.save(member);
    }

    /*존재하는 회원인지 확인*/
    public Member validateVerifyMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        return optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    /*중복 회원인지 확인*/
    public void validateDuplicateMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findByEmail(member.getEmail());
        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_EXISTS);
        }
    }

}

