package com.mainproject.server.batch;

import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.board.repository.BoardRepository;
import com.mainproject.server.domain.board.service.BoardService;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Configuration
@EnableBatchProcessing
@RequiredArgsConstructor
public class BatchConfig {
    @Autowired
    public JobBuilderFactory jobBuilderFactory;

    @Autowired
    public StepBuilderFactory stepBuilderFactory;

    private final BoardRepository boardRepository;

    private final BoardService boardService;

    @Bean
    public Job boardJob() {
        Job job = jobBuilderFactory.get("boardJob")
                .start(changeBoardStatus())
                .on("FAILED")
                .stopAndRestart(changeBoardStatus())
                .on("*")
                .end()
                .end()
                .build();

        return job;
    }


    @Bean
    public Step changeBoardStatus() {
        return stepBuilderFactory.get("changeBoardStatus")
                .tasklet(new BoardTasklet(boardRepository, boardService))
                .build();
    }

}
