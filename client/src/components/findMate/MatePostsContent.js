import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MatePostList from './MatePostList';
import Button from '../common/Button';
import Title from '../common/Title';
import { flexColCenter, flexRowCenter } from '../../style/styleVariable';
import { dummyPosts } from '../../static/dummyData';

const PostsContentLayOut = styled.div`
  ${flexColCenter}
  padding: 2rem;
`;

const PostsContentRow = styled.div`
  ${flexRowCenter}
  width: 100%;
  justify-content: space-between;
  > div {
    ${flexRowCenter}
  }
`;

const MatePostsContent = () => {
  const navigate = useNavigate();
  return (
    <PostsContentLayOut>
      <PostsContentRow>
        <div>
          <Title as="h3" size={'medium'}>
            산책 모임
          </Title>
          <input type="date"></input>
          <input type="time"></input>
        </div>
        <Button color="main" onClick={() => navigate('/')}>
          글 작성
        </Button>
      </PostsContentRow>
      <MatePostList postList={dummyPosts} />
    </PostsContentLayOut>
  );
};

export default MatePostsContent;
