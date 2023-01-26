import { useQuery } from 'react-query';
import { useState } from 'react';
import styled from 'styled-components';
import Title from '../common/Title';
import EditMemberModal from './Modal/EditMemberModal';
import MemberInfoCard from './MemberInfoCard';
import WithdrawalModal from '../WithdrawalModal';
import { getMyInfo } from '../../api/member/member';

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

const MemberInfo = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);
  const memberId = localStorage.getItem('memberId');

  const { data: memberInfo, isLoading } = useQuery(
    // memberId가 변화할 때마다 fetch
    ['myInfo', memberId],
    async () => await getMyInfo(memberId)
  );

  const handleClickDeleteMember = () => {
    setDeleteModal(!DeleteModal);
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <UserInfoContainer>
        <Title as="h2">나의 정보</Title>
        <MemberInfoCard memberInfo={memberInfo} />
        <button
          className="edit-account"
          onClick={() => {
            setIsEditModalOpen(true);
          }}
        >
          정보 수정
        </button>
        <button className="delete-account" onClick={handleClickDeleteMember}>
          회원 탈퇴
        </button>
      </UserInfoContainer>
      {isEditModalOpen ? (
        <EditMemberModal
          setIsEditModalOpen={setIsEditModalOpen}
          memberInfo={memberInfo}
        />
      ) : (
        ''
      )}
      {DeleteModal ? <WithdrawalModal /> : ''}
    </>
  );
};

export default MemberInfo;
