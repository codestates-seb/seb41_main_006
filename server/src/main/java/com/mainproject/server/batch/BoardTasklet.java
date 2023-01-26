package com.mainproject.server.batch;

import com.mainproject.server.domain.board.entity.Board;
import com.mainproject.server.domain.board.repository.BoardRepository;
import com.mainproject.server.domain.board.service.BoardService;
import com.mainproject.server.exception.BusinessLogicException;
import com.mainproject.server.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;

import java.time.LocalDateTime;
import java.util.List;


@Slf4j
@RequiredArgsConstructor
public class BoardTasklet implements Tasklet {
    private final BoardRepository boardRepository;
    private final BoardService boardService;
    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
        log.info("=====Start Change Board Status======");
        List<Board> findBoards
                = boardRepository.findByAppointTimeLessThanEqual(LocalDateTime.now());

        if(findBoards.isEmpty() || findBoards == null || findBoards.size() == 0) {
            log.info("=====변경할 게시글이 없습니다.=====");
        } else {
            for(Board board : findBoards) {
                board.setBoardStatus(Board.BoardStatus.BOARD_CLOSE);
                boardRepository.save(board);
            }
        }
        log.info("=====End Change Board Status======");
        return RepeatStatus.FINISHED;
    }
}

