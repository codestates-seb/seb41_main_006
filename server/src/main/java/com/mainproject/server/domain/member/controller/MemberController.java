package com.mainproject.server.domain.member.controller;

import com.mainproject.server.domain.member.dto.MemberDto;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.member.mapper.MemberMapper;
import com.mainproject.server.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Validated
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member savedMember = memberService.createMember(memberMapper.memberPostDtoToMember(requestBody));

        return new ResponseEntity(memberMapper.memberToMemberResponseDto(savedMember), HttpStatus.OK);
    }

    @PatchMapping("/{member-id}/my-page")
    public ResponseEntity patchMember(@Valid @RequestBody MemberDto.Patch requestBody,
                                      @Positive @PathVariable("member-id") long memberId) {
        Member updateMember =
                memberService.updateMember(memberId, memberMapper.memberPathDtoToMember(requestBody));

        return new ResponseEntity(memberMapper.memberToMemberResponseDto(updateMember), HttpStatus.OK);
    }
}
