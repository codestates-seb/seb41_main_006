import styled from 'styled-components';
import { ColCenterBox } from '../FlexBoxs';
import ProfileImage from '../common/ProfileImage';
import MatePetSlideCard from './MatePetSlideCard';
import { GrayDog } from '../common/DogSvg';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 26rem;
  width: 18rem;
  /* box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1); */
  background-color: var(--bg-dark-color);
  border-radius: 20px;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  color: var(--main-font-color);
`;

const MemberCardHeader = styled.div`
  width: 100%;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > .user-info--name {
    margin-right: 0.25rem;
    color: var(--main--font-color);
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

const PetSlideBox = styled(ColCenterBox)`
  color: var(--main-font-color);
  flex: 1;
  height: 100%;

  > .pet-info--empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > div:first-child {
      height: 200px;
      svg {
        width: 100%;
        height: 100%;
      }
    }
    > div:last-child {
      margin-top: 1rem;
      text-align: center;
    }
  }

  // 슬라이더
  > .slider {
    width: 100%;
    height: 100%;

    // 양쪽에 달린 화살표 디자인
    .slick-prev::before,
    .slick-next::before {
      color: var(--main-color);
    }

    > .slick-list {
      width: 14rem;
      height: 100%;

      > .slick-track {
        height: 100%;

        > div {
          width: 14rem;
          height: 100%;
        }
      }
    }
  }
`;

const MateMemberCard = ({ member }) => {
  const settings = {
    className: 'slider variable-width',
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    swipeToSlide: false,
  };

  return (
    <MemberCard>
      <MemberCardHeader>
        <span className="user-info--name">{member.nickName}</span>
        <ProfileImage
          size="20px"
          src={member?.profileImage?.upFileUrl}
        ></ProfileImage>
      </MemberCardHeader>
      <PetSlideBox>
        {member?.petsInfo.length === 0 ? (
          <div className="pet-info--empty">
            <div>
              <GrayDog></GrayDog>
            </div>
            <div>
              <p>아직 강아지 정보가</p>
              <p>없습니다</p>
            </div>
          </div>
        ) : (
          <Slider {...settings}>
            {member?.petsInfo.map((pet) => {
              return (
                <div key={pet.petId}>
                  <MatePetSlideCard pet={pet} />
                </div>
              );
            })}
          </Slider>
        )}
      </PetSlideBox>
    </MemberCard>
  );
};

export default MateMemberCard;
