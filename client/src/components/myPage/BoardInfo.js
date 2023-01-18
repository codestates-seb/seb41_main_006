import MateBoardList from '../findMate/MateBoardList';
import { getMemberBoardList } from '../../api/member/member';
import { useState } from 'react';

const BoardInfo = ({ memberId }) => {
  const [myBoardList, setMyBoardList] = useState([]);
  useState(() => {
    getMemberBoardList(memberId).then((data) => setMyBoardList(data));
  }, [memberId]);

  return (
    <>
      <h2>나의 모임</h2>
      <MateBoardList boardList={myBoardList} />
    </>
  );
};

export default BoardInfo;
