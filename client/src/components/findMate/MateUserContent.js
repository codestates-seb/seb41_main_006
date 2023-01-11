import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MatePostList from './MatePostList';
import Button from '../common/Button';
import Title from '../common/Title';
import { flexColCenter, flexRowCenter } from '../../style/styleVariable';
import { MdFilterListAlt } from 'react-icons/md';

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
          <Title as="h3" size="medium">
            산책 메이트
          </Title>
        </div>
        <Button
          color="second"
          size="small"
          outline
          onClick={() => navigate('/')}
        >
          <MdFilterListAlt />
          상세 조건
        </Button>
      </UsersContentRow>
      <MatePostList />
    </UsersContentLayOut>
  );
};

export default MateUserContent;
