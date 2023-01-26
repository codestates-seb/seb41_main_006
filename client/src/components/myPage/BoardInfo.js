import { useQuery } from 'react-query';
import MateBoardList from '../findMate/MateBoardList';
import { getMyBoardsList } from '../../api/board/board';

const BoardInfo = () => {
  const { data } = useQuery(['myBoards'], async () => await getMyBoardsList());

  return (
    <>
      <h2>나의 모임</h2>
      <MateBoardList boardList={data} />
    </>
  );
};

export default BoardInfo;
