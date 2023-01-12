package com.mainproject.server.batchTest;

import com.mainproject.server.batch.BatchConfig;
import com.mainproject.server.batch.BoardScheduler;
import com.mainproject.server.batch.BoardTasklet;
import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.board.repository.BoardRepository;
import com.mainproject.server.domain.board.service.BoardService;
import com.mainproject.server.exception.BusinessLogicException;
import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.batch.core.*;
import org.springframework.batch.test.JobLauncherTestUtils;
import org.springframework.batch.test.JobRepositoryTestUtils;
import org.springframework.batch.test.context.SpringBatchTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.mockito.BDDMockito.given;

@SpringBatchTest
@AutoConfigureMockMvc
@SpringBootTest
public class BoardBatchTest {

    @Autowired
    private JobLauncherTestUtils jobLauncherTestUtils;

    @Autowired
    private JobRepositoryTestUtils jobRepositoryTestUtils;

    @Mock
    private BoardRepository boardRepository;

    @Autowired
    private Job job;

    @Test
    void batchTest() throws Exception {
        //given
        try{
            JobParameters jobParameters =
                    jobLauncherTestUtils.getUniqueJobParameters();
            JobExecution jobExecution =
                    jobLauncherTestUtils.launchJob(jobParameters);
        } catch (BusinessLogicException e) {
            assertEquals("Board not Found", e.getMessage());
        }
        //when
        //then
    }
}
