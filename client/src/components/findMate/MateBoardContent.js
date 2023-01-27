import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getBoardList } from '../../api/board/board';
import styled from 'styled-components';
import MateBoardList from './MateBoardList';
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

const MateBoardConent = ({ placeCode }) => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    ['boards', placeCode],
    async () => await getBoardList({ page: 1, size: 10, placeCode })
  );

  return (
    <PostsContentLayOut>
      <PostsContentRow>
        <div>
          <Title as="h3" size={'medium'}>
            산책 모임
          </Title>
          {/* <input type="date"></input>
          <input type="time"></input> */}
        </div>
        <Button color="main" onClick={() => navigate('/newmate')}>
          글 작성
        </Button>
      </PostsContentRow>
      {isLoading ? <div>loading...</div> : <MateBoardList boardList={data} />}
    </PostsContentLayOut>
  );
};

export default MateBoardConent;
