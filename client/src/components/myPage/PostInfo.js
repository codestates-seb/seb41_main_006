import MatePostList from '../findMate/MatePostList';
import dummyBoards from '../../api/board/dummyBoards';

const PostInfo = () => {
  return (
    <>
      <h2>나의 모임</h2>
      <MatePostList postList={dummyBoards} />
    </>
  );
};

export default PostInfo;
