import styled from 'styled-components';
import { useState } from 'react';
import Title from '../common/Title';
import EditMemberModal from './Modal/EditMemberModal';
import MemberInfoCard from './MemberInfoCard';
import WithdrawalModal from '../WithdrawalModal';

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  gap: 1.5rem;
  .edit-account {
    width: 15%;
    height: 40px;
    background-color: var(--sec-color);
    color: white;
    font-size: 1.2rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    :hover {
      background-color: var(--main-font-color);
      color: white;
    }
  }
  .delete-account {
    cursor: pointer;
    background-color: var(--bg-color);
    border: none;
    :visited {
      color: var(--sec-color);
    }
  }
`;

const MemberInfo = ({ member }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <UserInfoContainer>
        <Title as="h2">나의 정보</Title>
        <MemberInfoCard memberInfo={member} />
        <button
          className="edit-account"
          onClick={() => {
            setIsEditModalOpen(true);
          }}
        >
          정보 수정
        </button>
        <button
          className="delete-account"
          onClick={() => {
            setDeleteModal(!DeleteModal);
          }}
        >
          회원 탈퇴
        </button>
      </UserInfoContainer>
      {isEditModalOpen ? (
        <EditMemberModal
          setIsEditModalOpen={setIsEditModalOpen}
          memberInfo={member}
        />
      ) : (
        ''
      )}
      {DeleteModal ? <WithdrawalModal /> : ''}
    </>
  );
};

export default MemberInfo;
