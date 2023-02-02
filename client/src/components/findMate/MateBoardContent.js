// import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getBoardList } from '../../api/board/board';
import styled from 'styled-components';
import MateBoardList from './MateBoardList';
import Button from '../common/Button';
import Title from '../common/Title';
import { flexColCenter, flexRowCenter } from '../../style/styleVariable';
import { getLoginInfo } from '../../api/loginInfo';
import DogFootLoading from '../DogFootLoading';
import { alertLogin } from '../../alert';

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

  const loginMemberId = getLoginInfo().memberId;

  const { data, isLoading } = useQuery(
    ['boards', placeCode],
    async () => await getBoardList({ page: 1, size: 10, placeCode }),
    {
      placeholderData: [],
    }
  );

  const handleCreate = () => {
    if (loginMemberId) {
      navigate('/newmate');
    } else {
      alertLogin();
    }
  };

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
        <Button color="main" onClick={handleCreate}>
          글 작성
        </Button>
      </PostsContentRow>
      {isLoading || !placeCode ? (
        <div>
          <DogFootLoading />
        </div>
      ) : (
        <MateBoardList boardList={data} />
      )}
    </PostsContentLayOut>
  );
};

export default MateBoardConent;
