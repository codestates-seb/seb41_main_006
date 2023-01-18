import styled from 'styled-components';
import { useState } from 'react';
import EditMemberModal from './Modal/EditMemberModal';
import MemberInfoCard from './MemberInfoCard';
import { dummyUserInfo } from '../../api/dummyData/dummyUserInfo';
import WithdrawalModal from '../WithdrawalModal';

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
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
    margin: 2% 0 5% 0;
    cursor: pointer;
    background-color: var(--bg-color);
    border: none;
    :visited {
      color: var(--sec-color);
    }
  }
`;

const MemberInfo = () => {
  const [Modal, setModal] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);
  return (
    <>
      <UserInfoContainer>
        <MemberInfoCard dummyUserInfo={dummyUserInfo[0]} />
        <button
          className="edit-account"
          onClick={() => {
            setModal(!Modal);
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
      {Modal ? <EditMemberModal setModal={setModal} Modal={Modal} /> : ''}
      {DeleteModal ? <WithdrawalModal /> : ''}
    </>
  );
};

export default MemberInfo;
