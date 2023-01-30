import styled from 'styled-components';
import MateBoardCard from './MateBoardCard';
import { GrayDog } from '../common/DogSvg';

const BoardList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(316px, 1fr));
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.5rem;
`;

const BoardItem = styled.li`
  height: 13rem;
  position: relative;
  padding-top: 60%;
`;

const NoBoardBox = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: var(--main-font-color);

  > .dog-face {
    width: 13rem;
    height: 16rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  > .no-pets-msg {
    margin-bottom: 1rem;
    font-weight: 500;
  }
`;

const MateBoardList = ({ boardList }) => {
  if (!boardList || boardList.length === 0) {
    return (
      <NoBoardBox>
        <div className="no-pets-msg">주소에 해당하는 모임 글이 없습니다!</div>
        <div className="dog-face">
          <GrayDog></GrayDog>
        </div>
      </NoBoardBox>
    );
  }
  return (
    <BoardList>
      {boardList.map((el) => (
        <BoardItem key={el.boardId}>
          <MateBoardCard board={el} />
        </BoardItem>
      ))}
    </BoardList>
  );
};

MateBoardList.defaultProps = {
  boardList: [],
};

export default MateBoardList;
