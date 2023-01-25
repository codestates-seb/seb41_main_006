package com.mainproject.server.domain.member.repository;

import com.mainproject.server.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    Optional<Member> findMemberByNickName(String nickName);
    Page<Member> findByAddress(String address, Pageable pageable);
}
