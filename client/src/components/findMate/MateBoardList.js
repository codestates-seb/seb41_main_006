import styled from 'styled-components';
import MateBoardCard from './MateBoardCard';

const BoardList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(316px, 1fr));
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.5rem;
`;

const BoardItem = styled.li`
  height: 13.25rem;
  position: relative;
  padding-top: 60%;
`;

const MateBoardList = ({ boardList, isMyPageBoardList }) => {
  return (
    <BoardList>
      {boardList.map((el) => (
        <BoardItem key={el.boardId}>
          <MateBoardCard board={el} isMyPageBoardCard={isMyPageBoardList} />
        </BoardItem>
      ))}
    </BoardList>
  );
};

MateBoardList.defaultProps = {
  boardList: [],
};

export default MateBoardList;
