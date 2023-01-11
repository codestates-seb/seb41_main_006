package com.mainproject.server.batch;

import com.mainproject.server.domain.board.repository.BoardRepository;
import com.mainproject.server.domain.board.service.BoardService;
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
                .start(findBoard())      // findBoard step 시작
                .on("FAILED")     // findBoard가 실패할 경우
                .end()                   // 종료
                .from(findBoard())       // findBoard 결과로 부터
                .on("*")          // FAILED를 제외한 모든 경우를
                .to(ChangeBoardStatus()) // 다음 step으로 이동해 실행
                .on("FAILED")
                .stopAndRestart(ChangeBoardStatus())
                .from(ChangeBoardStatus())
                .on("*")
                .to(saveBoard())
                .on("FAILED")
                .stopAndRestart(saveBoard())
                .from(saveBoard())
                .on("*")
                .end()
                .end()
                .build();

        return job;
    }

    @Bean
    public Step findBoard() { // BoardRepository에서 약속시간이 지난 객체 찾아오기
        return stepBuilderFactory.get("findBoard")
                .tasklet((contribution, chunkContext) -> {
                    log.info("=====Start Find Board======");
                    return RepeatStatus.FINISHED;
                })
                .build();
    }

    @Bean
    public Step ChangeBoardStatus() { // 찾아온 List<Board> 들의 BoardStatus 값을 BOARD_CLOSE로 변경하기
        return stepBuilderFactory.get("ChangeBoardStatus")
                .tasklet((contribution, chunkContext) -> {
                    log.info("======Start Change Board Status=====");
                    return RepeatStatus.FINISHED;
                })
                .build();
    }

    @Bean
    public Step saveBoard() { // 값을 변경한 Board 저장
        return stepBuilderFactory.get("saveBoard")
                .tasklet((contribution, chunkContext) -> {
                    log.info("=====Save Board=====");
                    return RepeatStatus.FINISHED;
                })
                .build();
    }
}
