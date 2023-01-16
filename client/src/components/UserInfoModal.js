import PetInfoCard from './myPage/PetInfoCard';
import { dummyUserInfo } from '../static/dummyUserInfo';
import { petInfo } from '../static/dummyMyPetinfo';
import styled from 'styled-components';
import UserInfoCard from './myPage/UsetInfoCard';
import Button from './common/Button';

const SContainer = styled.div`
  display: flex;
  align-items: center;
  width: 42rem;
  height: 27rem;
  background-color: var(--bg-color);
  border-radius: 10px;

  > .userInfo-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;

    > button {
      margin-top: 1rem;
      width: 10rem;
    }
  }

  > .petInfo-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const UserInfoModal = () => {
  return (
    <SContainer>
      <div className="userInfo-container">
        <UserInfoCard userInfo={dummyUserInfo[0]} />
        <Button>채팅하기</Button>
      </div>
      <div className="petInfo-container">
        <PetInfoCard pet={petInfo[0]} />
      </div>
    </SContainer>
  );
};

export default UserInfoModal;
