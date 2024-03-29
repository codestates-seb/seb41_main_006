import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { openModal } from '../../store/modules/modalSlice';
import { useDispatch, useSelector } from 'react-redux';

import { flexRowCenter } from '../../style/styleVariable';
import ProfileImage from '../common/ProfileImage';
import Title from '../common/Title';
import { uctTokst } from '../../utils/dateConvert';
// import { getAddressByCode } from '../../api/kakaoMap/getAddressByCode';
import { BoardCloseBox, BoardOpenBox } from '../BoardStatus';
import { IoLocationSharp } from 'react-icons/io5';
import { TbCalendarTime } from 'react-icons/tb';
import { FaHeart } from 'react-icons/fa';
// import { useEffect, useState } from 'react';

const BoardCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;

  .board-card--top {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    margin-bottom: 1rem;

    .board-card--status {
      width: 4.5rem;
      margin-bottom: 0.1rem;
    }

    .board-card--meet {
      ${flexRowCenter}
      gap: 0.3rem;
      color: #000000;
    }
  }

  .board-card--bottom {
    ${flexRowCenter}
    color: var(--main-font-color);
    font-weight: 500;
    align-items: center;
    justify-content: space-between;

    div,
    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
      line-height: 1;
      svg {
        color: var(--main-color);
      }
    }
  }
`;

const MateBoardCard = ({ board }) => {
  const { address } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  const handleClickMember = (memberId) => {
    dispatch(openModal({ type: 'member', props: { memberId } }));
  };

  return (
    <BoardCard>
      <Link to={`/boards/${board.boardId}`}>
        <div className="board-card--top">
          <div className="board-card--status">
            {board.boardStatus === 'BOARD_OPEN' ? (
              <BoardOpenBox>모집중</BoardOpenBox>
            ) : (
              <BoardCloseBox>모집완료</BoardCloseBox>
            )}
          </div>
          <Title as="h4" size="small" className="board-card--title">
            {board.title}
          </Title>
          <div className="board-card--meet">
            <IoLocationSharp />
            <span>{address}</span>
          </div>
          <div className="board-card--meet">
            <TbCalendarTime />
            <span>{uctTokst(board.appointTime)}</span>
          </div>
        </div>
      </Link>
      {board?.member ? (
        <div className="board-card--bottom">
          <button onClick={() => handleClickMember(board?.member?.memberId)}>
            <ProfileImage
              src={board?.member?.profileImage?.upFileUrl}
              name={board?.member?.nickName}
              size="2rem"
            />
            <span>{board?.member?.nickName}</span>
          </button>
          <div>
            <FaHeart />
            {board.countLike}
          </div>
        </div>
      ) : null}
    </BoardCard>
  );
};

export default MateBoardCard;
