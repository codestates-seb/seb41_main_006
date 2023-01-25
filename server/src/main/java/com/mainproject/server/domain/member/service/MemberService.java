package com.mainproject.server.domain.member.service;

import com.mainproject.server.auth.utils.CustomAuthorityUtils;
import com.mainproject.server.awsS3.entity.S3UpFile;
import com.mainproject.server.awsS3.service.S3UpFileService;
import com.mainproject.server.domain.address.repository.AddressRepository;
import com.mainproject.server.domain.member.dto.MemberDto;
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
    private final CustomBeanUtils<MemberDto.Patch, Member> customBeanUtils;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final S3UpFileService s3UpFileService;
    private final AddressRepository addressRepository;

    /*회원 신규 가입*/
    public Member createMember(Member member, Optional<Long> profileImageId) {
        validateDuplicateEmail(member.getEmail());
        // 비밀번호 암호화
        String encodePassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodePassword);
        // 권한 정보 세팅
        member.setRoles(customAuthorityUtils.createRole());

        if (profileImageId.isPresent()) {
            S3UpFile s3UpFile = s3UpFileService.validateVerifyFile(profileImageId.get());
            member.setS3UpFile(s3UpFile);
        }

        return memberRepository.save(member);
    }

    /*마이페이지 정보 수정*/
    public Member updateMypageInfo(long memberId, Optional<Long> profileImageId, MemberDto.Patch requestBody) {
        Member findMember = validateVerifyMember(memberId);
        Member updatedMember = customBeanUtils.copyNonNullProperties(requestBody, findMember);

        if (profileImageId.isPresent()) {
            S3UpFile s3UpFile = s3UpFileService.validateVerifyFile(profileImageId.get());
            updatedMember.setS3UpFile(s3UpFile);
        } else {
            updatedMember.setS3UpFile(null);
        }

        return memberRepository.save(updatedMember);
    }

    /*해당 주소를 가지고 있는 회원들 조회*/
    @Transactional(readOnly = true)
    public Page<Member> findMembersByAddress(String address, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return memberRepository.findByAddress(address, pageRequest);
    }

    /*회원 정보 조회*/
    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        Member member = validateVerifyMember(memberId);
        return member;
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
    public void validateDuplicateEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_EXISTS);
        }
    }

    /*중복 닉네임인지 확인*/
    public void validateDuplicateNickname(String nickname) {
        Optional<Member> memberByNickName = memberRepository.findMemberByNickName(nickname);
        if(memberByNickName.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NICKNAME_ALREADY_EXISTS);
        }
    }

    /*법정 코드로 주소 가져오기*/
    public String getFullAddressByBeopJeongCd(String beopJeongCd){
        return addressRepository.findFullAddressByBeopJeongCd(beopJeongCd);
    }
}

