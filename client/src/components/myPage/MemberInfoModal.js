import PetInfoCard from './PetInfoCard';
import { dummyUserInfo } from '../../api/dummyData/dummyUserInfo';
import { petInfo } from '../../api/dummyData/dummyMyPetinfo';
import styled from 'styled-components';
import ShowMemberCard from './ShowMemberCard';

const SContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 40%;
  height: 60%;
  background-color: var(--bg-color);
`;
const SBackground = styled.div`
  background-color: rgba(217, 217, 217, 0.8);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MemberInfoModal = () => {
  return (
    <SBackground>
      <SContainer>
        <ShowMemberCard dummyUserInfo={dummyUserInfo[0]} />
        <PetInfoCard pet={petInfo[0]} />
      </SContainer>
    </SBackground>
  );
};

export default MemberInfoModal;
