import MateBoardList from '../findMate/MateBoardList';
import dummyBoards from '../../api/board/dummyBoards';

const BoardInfo = () => {
  return (
    <>
      <h2>나의 모임</h2>
      <MateBoardList postList={dummyBoards} />
    </>
  );
};

export default BoardInfo;
