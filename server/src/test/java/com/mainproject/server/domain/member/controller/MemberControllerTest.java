package com.mainproject.server.domain.member.controller;

import com.google.gson.Gson;
import com.mainproject.server.domain.member.dto.MemberDto;
import com.mainproject.server.domain.member.mapper.MemberMapper;
import com.mainproject.server.domain.member.service.MemberService;
import com.mainproject.server.domain.pet.mapper.PetMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
//@WebMvcTest(MemberController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureMockMvc(addFilters = false)
@Transactional
class MemberControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private MemberService memberService;

    @Autowired
    private MemberMapper memberMapper;

//    @Test
//    void getMembersWithAddress() throws Exception {
//        MemberDto.Post post1 = MemberDto.Post.builder()
//                .nickName("테스트1").email("test1@gmail.com").password("!1a2s3d4f")
//                .age(10).address("1").gender("M").build();
//    }

}