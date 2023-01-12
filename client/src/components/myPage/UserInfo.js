import styled from 'styled-components';
import { useState } from 'react';
import EdituserModal from './EdituserModal';
import UserInfoCard from './UsetInfoCard';
import { dummyUserInfo } from '../../static/dummyUserInfo';

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  button {
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
  :last-child {
    margin-bottom: 50px;
  }
`;

const UserInfo = () => {
  const [Modal, setModal] = useState(false);
  return (
    <>
      <UserInfoContainer>
        <UserInfoCard dummyUserInfo={dummyUserInfo[0]} />
        <button
          onClick={() => {
            setModal(!Modal);
          }}
        >
          정보 수정
        </button>
        <div>회원 탈퇴</div>
      </UserInfoContainer>
      {Modal ? <EdituserModal setModal={setModal} Modal={Modal} /> : ''}
    </>
  );
};

export default UserInfo;
