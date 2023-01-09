package com.mainproject.server.domain.member.service;

import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

//    private void validateDuplicateMember(Member member) {
//        Optional<Member> optionalMember = memberRepository.findByEmail(member.getEmail());
//        if (optionalMember.isPresent()) {
////            throw new BusinesslogicException();
//        }
}

