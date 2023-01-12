import MatePostList from '../findMate/MatePostList';
import { dummyPosts } from '../../static/dummyData';

const PostInfo = () => {
  return (
    <>
      <h2>나의 모임</h2>
      <MatePostList postList={dummyPosts} />
    </>
  );
};

export default PostInfo;
