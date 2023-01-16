import styled from 'styled-components';
import MatePostCard from './MatePostCard';

const PostList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(316px, 1fr));
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.5rem;
`;

const PostItem = styled.li`
  height: 13.25rem;
  position: relative;
  padding-top: 60%;
`;

const MatePostList = ({ postList }) => {
  return (
    <PostList>
      {postList.map((el) => (
        <PostItem key={el.id}>
          <MatePostCard post={el} />
        </PostItem>
      ))}
    </PostList>
  );
};

export default MatePostList;
