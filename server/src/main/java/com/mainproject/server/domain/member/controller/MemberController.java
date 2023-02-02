package com.mainproject.server.domain.member.controller;

import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.awsS3.entity.S3UpFile;
import com.mainproject.server.domain.address.repository.AddressRepository;
import com.mainproject.server.domain.member.dto.MemberDto;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.mapper.MemberMapper;
import com.mainproject.server.domain.member.service.MemberService;
import com.mainproject.server.dto.MultiResponseDto;
import com.mainproject.server.dto.SingleResponseDto;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.response.PageInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Validated
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final AddressRepository addressRepository;

    /*회원 가입*/
    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Long profileImageId = requestBody.getProfileImageId();
        Member member = memberMapper.memberPostDtoToMember(requestBody);

        Member savedMember = memberService.createMember(member, Optional.ofNullable(profileImageId));

        return new ResponseEntity(
            new SingleResponseDto<>(memberMapper.memberToMemberSimpleResponseDto(savedMember)), HttpStatus.OK);
    }

    /*마이 페이지 회원 정보 수정*/
    @PatchMapping("/{member-id}/my-page")
    public ResponseEntity patchMember(@Valid @RequestBody MemberDto.Patch requestBody,
                                      @Positive @PathVariable("member-id") long memberId) {
        log.info("마이페이지 회원 정보 수정, requestBody = {}", requestBody);
        Long profileImageId = requestBody.getProfileImageId();

        Member updateMypageInfo =
                memberService.updateMypageInfo(memberId, Optional.ofNullable(profileImageId), requestBody);

        return new ResponseEntity(
                new SingleResponseDto<>(memberMapper.memberToMemberSimpleResponseDto(updateMypageInfo)), HttpStatus.OK);
    }

    /*특정 주소를 가지고 있는 회원 전체 조회*/
    @GetMapping
    public ResponseEntity getMembersWithAddress(@RequestParam("address") String address,
                                                @Positive @RequestParam("page") int page,
                                                @Positive @RequestParam("size") int size) {

        Page<Member> membersWithAddress = memberService.findMembersByAddress(address, page - 1, size);

        List<Member> content = membersWithAddress.getContent();
        PageInfo pageInfo = new PageInfo(membersWithAddress.getNumber() + 1,
                membersWithAddress.getSize(),
                (int) membersWithAddress.getTotalElements(),
                membersWithAddress.getTotalPages());

        return new ResponseEntity(
                new MultiResponseDto<>(
                        memberMapper.membersToMemberResponseWithPets(content, address), pageInfo),
                HttpStatus.OK);
    }

    /*휴면 회원 살리기*/
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@Positive @PathVariable("member-id") long memberId,
                                      @RequestBody MemberDto.Active requestBody) {
        Member member = memberService.updateMember(memberId, requestBody);
        String fullAddress = addressRepository.findFullAddressByBeopJeongCd(member.getAddress());

        return new ResponseEntity(
                new SingleResponseDto<>(
                        memberMapper.memberToMemberResponseWithPets(member, fullAddress)), HttpStatus.OK);
    }

    /*특정 회원 정보 조회*/
    @GetMapping("/{member-id}")
    public ResponseEntity getMemberInfoWithPets(@Positive @PathVariable("member-id") long memberId) {
        Member member = memberService.findMember(memberId);
        String fullAddress = addressRepository.findFullAddressByBeopJeongCd(member.getAddress());
        return new ResponseEntity(
                new SingleResponseDto<>(
                        memberMapper.memberToMemberResponseWithPets(member, fullAddress)), HttpStatus.OK);
    }

    /*마이 페이지 회원 정보 조회*/
    @GetMapping("/{member-id}/my-page")
    public ResponseEntity getMypageInfo(@Positive @PathVariable("member-id") long memberId,
                                        @AuthenticationPrincipal MemberDetails memberDetails) {
        if (memberDetails == null || memberDetails.getMemberId() != memberId) {
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN_ACCESS);
        }
        Member member = memberService.findMember(memberId);
        S3UpFile s3UpFile = member.getS3UpFile();
        String fullAddress = addressRepository.findFullAddressByBeopJeongCd(member.getAddress());

        return new ResponseEntity(
                new SingleResponseDto<>(memberMapper.memberToResponseWithFullAddress(member, fullAddress, s3UpFile)), HttpStatus.OK);
    }

    /*닉네임 조회*/
    @GetMapping("/nickname/verify")
    public ResponseEntity getNickName(@RequestParam("nickname") String nickName) {
        memberService.validateDuplicateNickname(nickName);
        return new ResponseEntity(HttpStatus.OK);
    }

    /*회원 탈퇴*/
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@Positive @PathVariable("member-id") long memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
