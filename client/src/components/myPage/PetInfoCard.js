import styled from 'styled-components';
import Title from '../common/Title';
import PetProfileImage from '../common/PetProfileImage';
import { RowCenterBox } from '../FlexBoxs';
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai';
import { HiXMark, HiCheck } from 'react-icons/hi2';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  color: var(--main-font-color);

  > .image-box {
    width: 100%;
    height: 17.5rem;
    border-radius: 10px;
  }
`;

const PetInfoCardBottom = styled.div`
  padding: 0.25rem;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  > .info {
    display: flex;
    align-items: centser;
    font-size: 0.875rem;
    margin-top: 0.125rem;

    > span {
      display: flex;
      align-items: center;
      border-right: 0.5px solid var(--main-font-color);
      padding-right: 0.5rem;
      padding-left: 0.5rem;

      &:first-child {
        padding-left: 0px;
      }

      &:last-child {
        border: none;
      }
    }
  }

  > .mypet-info--aboutDog {
    font-weight: 500;
  }
`;

const PetInfoCard = ({ pet }) => {
  return (
    <CardContainer>
      <div className="image-box">
        <PetProfileImage
          src={pet?.profileImage?.upFileUrl}
          alt=""
        ></PetProfileImage>
      </div>
      <PetInfoCardBottom>
        <Title as="h3" size="small">
          {pet?.name}
        </Title>
        <div className="info">
          <span>{pet?.breed}</span>
          <span>{pet?.age}살</span>
          <span>
            {pet?.gender === 'M' ? <AiOutlineMan /> : <AiOutlineWoman />}
          </span>
          <span>
            {pet?.neutered ? (
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
        </div>
        <div className="mypet-info--aboutDog">{pet?.aboutDog}</div>
      </PetInfoCardBottom>
    </CardContainer>
  );
};

export default PetInfoCard;
