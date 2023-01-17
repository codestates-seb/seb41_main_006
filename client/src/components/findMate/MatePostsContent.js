import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoardList } from '../../api/board/board';
import styled from 'styled-components';
import MatePostList from './MatePostList';
import Button from '../common/Button';
import Title from '../common/Title';
import { flexColCenter, flexRowCenter } from '../../style/styleVariable';

const PostsContentLayOut = styled.div`
  ${flexColCenter}
  padding: 2rem;
`;

const PostsContentRow = styled.div`
  ${flexRowCenter}
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1rem;
  > div {
    ${flexRowCenter}
  }
`;

const MatePostsContent = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getBoardList().then((data) => setPostList(data));
  }, []);

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
        <Button color="main" onClick={() => navigate('/newmate')}>
          글 작성
        </Button>
      </PostsContentRow>
      <MatePostList postList={postList} />
    </PostsContentLayOut>
  );
};

export default MatePostsContent;
