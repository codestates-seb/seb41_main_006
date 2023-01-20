package com.mainproject.server.domain.board.entity;

import com.mainproject.server.audit.Auditable;
import com.mainproject.server.domain.comments.entity.Comments;
import com.mainproject.server.domain.member.entity.Member;
import com.mainproject.server.domain.pet.entity.Pet;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Formula;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Board extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Lob
    private String content;

    @Column
    @Formula("(select count(*) from board_like b where b.board_id = board_id and b.like_status = 'LIKE')")
    private int countLike;

    @Column(nullable = false)
    private LocalDateTime appointTime;

    @Column(nullable = false)
    private String placeCode;

    @Column(nullable = false)
    private String X;

    @Column(nullable = false)
    private String y;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private BoardStatus boardStatus = BoardStatus.BOARD_OPEN;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    public List<Comments> commentList = new ArrayList<>();


    public void addComments(Comments comments) {
        commentList.add(comments);
        if(comments.getBoard() != this) {
            comments.setBoard(this);
        }
    }

    @OneToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    public void addPet(Pet pet) {
        this.pet = pet;
    }

    public void addMember(Member member) {
        this.member = member;
    }

    public enum BoardStatus {
        BOARD_OPEN("모집 중"),
        BOARD_CLOSE("모집 완료");
        private String status;

        BoardStatus(String status) {
            this.status = status;
        }
    }
}
