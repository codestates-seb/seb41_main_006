package com.mainproject.server.domain.member.service;

import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.repository.MemberRepository;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.utils.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.sql.Update;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Member> customBeanUtils;

    /*회원 신규 가입*/
    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

    /*마이페이지 정보 수정*/
    public Member updateMember(long memberId, Member member) {
        Member findMember = validateVerifyMember(memberId);
        Member updatedMember = customBeanUtils.copyNonNullProperties(member, findMember);

        return memberRepository.save(updatedMember);
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

