package com.mainproject.server.domain.board.entity;

import com.mainproject.server.audit.Auditable;
import com.mainproject.server.domain.comments.entity.Comments;
import com.mainproject.server.domain.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Board extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int countLike = 0;

    @Column(nullable = false)
    private LocalDateTime appointTime;

    @Column(nullable = false)
    private String meetingPlace;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private BoardStatus boardStatus = BoardStatus.BOARD_FINDING;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "board")
    public List<Comments> commentList = new ArrayList<>();


    public void addComments(Comments comments) {
        commentList.add(comments);
        if(comments.getBoard() != this) {
            comments.setBoard(this);
        }
    }

    public void addMember(Member member) {
        this.member = member;
    }

    public enum BoardStatus { // 스케줄러 or batch 자동화?
        BOARD_FINDING("메이트 구하는 중"),
        BOARD_FOUND("메이트 구하기 종료"),
        BOARD_EXPIRED("기간 만료");
        private String status;

        BoardStatus(String status) {
            this.status = status;
        }
    }
}
