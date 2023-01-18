import PetInfoCard from './myPage/PetInfoCard';
import { dummyUserInfo } from '../api/dummyData/dummyUserInfo';
import { petInfo } from '../api/dummyData/dummyMyPetinfo';
import styled from 'styled-components';
import MemberInfoCard from './myPage/MemberInfoCard';
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

const MemberInfoModal = () => {
  return (
    <SContainer>
      <div className="userInfo-container">
        <MemberInfoCard userInfo={dummyUserInfo[0]} />
        <Button>채팅하기</Button>
      </div>
      <div className="petInfo-container">
        <PetInfoCard pet={petInfo[0]} />
      </div>
    </SContainer>
  );
};

export default MemberInfoModal;
