import styled from 'styled-components';
import { ColCenterBox } from '../FlexBoxs';
import PetSlideCard from './PetSlideCard';
import Title from '../common/Title';
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
  .user-card--userName {
    margin-top: 0.5rem;
    span {
      color: var(--main-color);
      font-weight: 600;
    }
  }
`;

const MemberCardBody = styled(ColCenterBox)`
  color: var(--sec-color);
  flex: 1;
  height: 100%;

  // 슬라이더
  > .slider {
    width: 100%;
    height: 100%;

    // 양쪽에 달린 화살표 디자인
    .slick-prev::before,
    .slick-next::before {
      color: red;
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
  > .user-card--about {
    color: var(--main-font-color);
    font-weight: 600;
    margin: 0.8rem;
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
        <div className="user-card--userName">
          <span>{member.nickName}</span>
          님의 강아지
        </div>

        <Title as="h4" size="small">
          {member.petName}
        </Title>
      </MemberCardHeader>
      <MemberCardBody>
        <Slider {...settings}>
          {member?.petsInfo.map((pet) => {
            return (
              <div key={pet.petId}>
                <PetSlideCard pet={pet} />
              </div>
            );
          })}
        </Slider>
      </MemberCardBody>
    </MemberCard>
  );
};

export default MateMemberCard;
