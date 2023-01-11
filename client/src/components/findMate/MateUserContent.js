import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MatePostList from './MatePostList';
import Button from '../common/Button';
import Title from '../common/Title';
import { flexColCenter, flexRowCenter } from '../../style/styleVariable';

const UsersContentLayOut = styled.div`
  ${flexColCenter}
  padding: 2rem;
`;

const UsersContentRow = styled.div`
  ${flexRowCenter}
  width: 100%;
  justify-content: space-between;
  > div {
    ${flexRowCenter}
  }
`;

const MateUserContent = () => {
  const navigate = useNavigate();
  return (
    <UsersContentLayOut>
      <UsersContentRow>
        <div>
          <Title size="medium">산책 메이트</Title>
          <input type="date"></input>
          <input type="time"></input>
        </div>
        <Button color="main" onClick={() => navigate('/')}>
          글 작성
        </Button>
      </UsersContentRow>
      <MatePostList />
    </UsersContentLayOut>
  );
};

export default MateUserContent;
