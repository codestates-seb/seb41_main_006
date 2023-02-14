package com.mainproject.server.pet;

import com.google.gson.Gson;
import com.mainproject.server.auth.userdetails.MemberDetails;
import com.mainproject.server.domain.pet.controller.PetController;
import com.mainproject.server.domain.pet.dto.PetDto;
import com.mainproject.server.domain.pet.entity.Pet;
import com.mainproject.server.domain.pet.mapper.PetMapper;
import com.mainproject.server.domain.pet.service.PetService;
import com.mainproject.server.factory.MemberFactory;
import com.mainproject.server.factory.PetFactory;
import com.mainproject.server.token.MockToken;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PetController.class)
@MockBean(JpaMetamodelMappingContext.class)
public class PetControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private PetService petService;
    @MockBean
    private PetMapper mapper;

    private final String BASE_URL = "/pets";

    @Test
    @DisplayName("강아지 정보 등록")
    @WithMockUser(username = "test@gmail.com", roles = "USER")
    void createPetTest() throws Exception {
        //given
        PetDto.Post post = PetFactory.createPetPostDto();
        Pet expected = PetFactory.createPet();

        expected.setMember(MemberFactory.createMember());

        String content = gson.toJson(post);


        given(petService.createPet(Mockito.any(Pet.class), Mockito.any(MemberDetails.class), Optional.of(Mockito.anyLong()))).willReturn(expected);
        given(mapper.petToPetResponseDto(Mockito.any(Pet.class))).willReturn(PetFactory.createPetResponseDto(expected));
        //when
        ResultActions actions = mockMvc.perform(post(BASE_URL)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .with(csrf())
                .headers(MockToken.getMockToken())
                .content(content));

        //then
        actions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.name").value(expected.getName()))
                .andExpect(jsonPath("$.data.age").value(expected.getAge()))
                .andExpect(jsonPath("$.data.gender").value(expected.getGender()))
                .andExpect(jsonPath("$.data.neutered").value(expected.isNeutered()))
                .andExpect(jsonPath("$.data.aboutDog").value(expected.getAboutDog()))
                .andExpect(jsonPath("$.data.breed").value(expected.getBreed()));
    }

}
