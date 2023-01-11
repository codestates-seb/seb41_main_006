import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MatePostList from './MatePostList';
import Button from '../common/Button';
import { title } from '../../style/styleUtils';
import { flexColCenter, flexRowCenter } from '../../style/styleVariable';

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
const MatePostsTitle = styled.h3`
  ${title('medium')}
`;

const MatePostsContent = () => {
  const navigate = useNavigate();
  return (
    <PostsContentLayOut>
      <PostsContentRow>
        <div>
          <MatePostsTitle>산책 모임</MatePostsTitle>
          <input type="date"></input>
          <input type="time"></input>
        </div>
        <Button color="main" onClick={() => navigate('/')}>
          글 작성
        </Button>
      </PostsContentRow>
      <MatePostList />
    </PostsContentLayOut>
  );
};

export default MatePostsContent;
