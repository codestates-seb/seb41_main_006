import { useState } from 'react';
import styled from 'styled-components';
import MateUserList from './MateUserList';
import UserFilterModal from './UserFilterModal';
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
`;

const MateUsersContent = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsFilterModalOpen(true);
  };

  return (
    <UsersContentLayOut>
      <UsersContentRow>
        <Title as="h3" size="medium">
          산책 메이트
        </Title>
        <Button color="second" size="small" outline onClick={openModalHandler}>
          <MdFilterListAlt />
          상세 조건
        </Button>
      </UsersContentRow>
      <MateUserList />
      {isFilterModalOpen ? (
        <UserFilterModal setIsFilterModalOpen={setIsFilterModalOpen} />
      ) : null}
    </UsersContentLayOut>
  );
};

export default MateUsersContent;
