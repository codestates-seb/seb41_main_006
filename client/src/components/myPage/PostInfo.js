import MatePostCard from '../findMate/MatePostCard';
import { dummyPosts } from '../../static/dummyData';
import styled from 'styled-components';

const PostList = styled.ul`
  margin: 5% 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.5rem;
`;

const PostItem = styled.li`
  height: 13.75rem;
`;

const PostInfo = () => {
  return (
    <>
      <h2>나의 모임</h2>
      <PostList>
        {dummyPosts.map((el) => (
          <PostItem key={el.id}>
            <MatePostCard post={el} />
          </PostItem>
        ))}
      </PostList>
    </>
  );
};

export default PostInfo;
