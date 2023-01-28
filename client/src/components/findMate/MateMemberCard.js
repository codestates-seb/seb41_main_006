import styled from 'styled-components';
import { ColCenterBox } from '../FlexBoxs';
import ProfileImage from '../common/ProfileImage';
import MatePetSlideCard from './MatePetSlideCard';
import { GrayDog } from '../common/DogSvg';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MemberCard = styled(ColCenterBox)`
  height: 20rem;
  width: 15rem;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  justify-content: space-between;
  padding: 1.6rem 1rem;
  color: var(--main-font-color);
  border-radius: 20px;
`;

const MemberCardHeader = styled(ColCenterBox)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;

  > .user-info {
    padding-left: 0.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    > .user-info--name {
      margin-left: 0.5rem;
      color: var(--main--font-color);
      font-weight: 500;
    }
  }
`;

const MemberCardBody = styled(ColCenterBox)`
  color: var(--sec-color);
  flex: 1;
  height: 100%;

  > .pet-info--empty {
    height: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > svg {
      width: 5rem;
    }
    > div {
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
      width: 10rem;
      height: 100%;

      > .slick-track {
        height: 100%;

        > div {
          width: 10rem;
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
  };

  return (
    <MemberCard>
      <MemberCardHeader>
        <div className="user-info">
          <ProfileImage
            size="20px"
            src={member?.profileImage?.upFileUrl}
          ></ProfileImage>
          <span className="user-info--name">{member.nickName}</span>
        </div>
      </MemberCardHeader>
      <MemberCardBody>
        {member?.petsInfo.length === 0 ? (
          <div className="pet-info--empty">
            <GrayDog></GrayDog>
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
      </MemberCardBody>
    </MemberCard>
  );
};

export default MateMemberCard;
