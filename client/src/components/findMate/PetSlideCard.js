import PetProfileImage from '../common/PetProfileImage';
import styled from 'styled-components';
import { ColCenterBox } from '../FlexBoxs';

const PetSlideCardBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .pet--name {
    color: var(--main-font-color);
    font-weight: 500;
  }
`;

const PetSlideCard = ({ pet }) => {
  return (
    <PetSlideCardBox>
      <PetProfileImage
        width="100px"
        height="100px"
        src={pet?.profileImage?.upFileUrl}
        name={pet.name}
        circle
      />
      <ColCenterBox>
        <span className="pet--name">{pet.name}</span>
        <span className="pet--breed">{pet.breed}</span>
        <span className="pet--age">{pet.age}세</span>
        <span className="pet--gender">{pet.gender}</span>
        <span>{pet.petNeutered ? '중성화 O' : '중성화 X'}</span>
      </ColCenterBox>
    </PetSlideCardBox>
  );
};

export default PetSlideCard;
