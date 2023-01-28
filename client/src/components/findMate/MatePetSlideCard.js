import PetProfileImage from '../common/PetProfileImage';
import styled from 'styled-components';
import { RowCenterBox } from '../FlexBoxs';
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai';
import { HiXMark, HiCheck } from 'react-icons/hi2';

const PetSlideCardBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
  color: var(--main-font-color);
`;

const PetInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 0.5rem;

  span,
  svg {
    color: var(--main-font-color);
    font-size: 0.875rem;
  }

  > .pet--name {
    color: var(--main-font-color);
    font-weight: 600;
    font-size: 1.25rem;
  }

  > .pet--info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const MatePetSlideCard = ({ pet }) => {
  return (
    <PetSlideCardBox>
      <PetProfileImage
        width="150px"
        height="130px"
        src={pet?.profileImage?.upFileUrl}
        name={pet.name}
      />
      <PetInfoBox>
        <span size="xsmall" className="pet--name">
          {pet.name}
        </span>
        <span className="pet--breed">{pet.breed}</span>
        <div className="pet--info">
          <span>{pet.age}세</span>
          <span>/</span>
          {pet.gender === 'M' ? <AiOutlineMan /> : <AiOutlineWoman />}
        </div>
        <span>
          {pet.neutered ? (
            <RowCenterBox>
              중성화
              <HiCheck />
            </RowCenterBox>
          ) : (
            <RowCenterBox>
              중성화
              <HiXMark />
            </RowCenterBox>
          )}
        </span>
      </PetInfoBox>
    </PetSlideCardBox>
  );
};

export default MatePetSlideCard;
