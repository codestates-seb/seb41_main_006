import MateBoardList from '../findMate/MateBoardList';
import { dummyPosts } from '../../static/dummyData';

const BoardInfo = () => {
  return (
    <>
      <h2>나의 모임</h2>
      <MateBoardList postList={dummyPosts} />
    </>
  );
};

export default BoardInfo;
