import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMyBoardsList } from '../../api/board/board';
import { convertCreatedAt } from '../../utils/dateConvert';
// import { convertAppointDate } from '../../utils/dateConvert';
import styled from 'styled-components';
import { flexRowCenter } from '../../style/styleVariable';
import Title from '../common/Title';
import { BoardCloseBox, BoardOpenBox } from '../BoardStatus';
import PetProfileImage from '../common/PetProfileImage';
import { FaHeart } from 'react-icons/fa';
import { GrayDog } from '../common/DogSvg';

const MyBoardList = styled.ul`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(1);
  grid-row-gap: 1rem;

  > li {
    min-height: 3rem;
  }
`;

const BoardCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: white;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  width: 100%;
  height: 100%;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
  color: var(--main-font-color);

  .board-card--left {
    display: flex;
    align-items: center;
    flex: 3;
    gap: 0.5rem;

    .board-status {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      width: 5rem;
    }
    .board-card--title {
      ${flexRowCenter}
      gap: 0.5rem;
      width: 10rem;
    }

    .board-card--content {
      font-size: 0.875rem;
      flex: 1;
    }
  }

  .board-card--right {
    ${flexRowCenter}
    color: var(--main-font-color);
    align-items: center;
    justify-content: space-between;

    .board-likes {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      gap: 0.25rem;
      margin-right: 1rem;

      svg {
        color: var(--main-color);
      }
    }

    > .profile {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      margin-right: 0.5rem;
    }

    .board-info {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      gap: 0.5rem;
      font-size: 1rem;
      line-height: 1;

      .board-createdAt {
        font-size: 0.875rem;
      }
    }
  }
`;

const NoPetBox = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  > .dog-face {
    width: 13rem;
    height: 16rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  > .no-pets-msg {
    margin-top: 1rem;
    font-weight: 500;
  }
`;

const BoardInfo = () => {
  const { data: myBoardList } = useQuery(
    ['myBoards'],
    async () => await getMyBoardsList(),
    {
      placeholderData: [],
    }
  );

  return (
    <>
      <h2>나의 모임</h2>
      {!myBoardList || myBoardList.length === 0 ? (
        <NoPetBox>
          <div className="dog-face">
            <GrayDog></GrayDog>
          </div>
          <div className="no-pets-msg">현재 등록된 모임 게시글이 없어요!</div>
        </NoPetBox>
      ) : (
        <MyBoardList>
          {myBoardList.map((board) => (
            <li key={board.boardId}>
              <Link to={`/boards/${board.boardId}`}>
                <BoardCard>
                  <div className="board-card--left">
                    <div className="board-status">
                      {board.boardStatus === 'BOARD_OPEN' ? (
                        <BoardOpenBox height="20px">모집중</BoardOpenBox>
                      ) : (
                        <BoardCloseBox height="20px">모집완료</BoardCloseBox>
                      )}
                    </div>
                    <div className="board-card--title">
                      <Title as="h4" size="xsmall">
                        {board.title}
                      </Title>
                    </div>
                  </div>

                  <div className="board-card--right">
                    <div className="board-likes">
                      <FaHeart />
                      <span>{board.countLike}</span>
                    </div>
                    {board?.pet ? (
                      <div className="profile">
                        <PetProfileImage
                          src={board?.pet?.profileImage?.upFileUrl}
                          name={board?.pet?.nickName}
                          circle
                          width="1.25rem"
                          height="1.25rem"
                        />
                        <span>{board?.pet?.name}</span>
                      </div>
                    ) : null}
                    <div className="board-info">
                      <span className="board-createdAt">
                        {convertCreatedAt(board.createdAt)}
                      </span>
                    </div>
                  </div>
                </BoardCard>
              </Link>
            </li>
          ))}
        </MyBoardList>
      )}
    </>
  );
};

export default BoardInfo;
