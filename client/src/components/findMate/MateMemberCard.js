import styled from 'styled-components';
import { ColCenterBox } from '../FlexBoxs';
import ProfileImage from '../common/ProfileImage';
import MatePetSlideCard from './MatePetSlideCard';
import { GrayDog } from '../common/DogSvg';
import Slider from 'react-slick';
import { openModal } from '../../store/modules/modalSlice';
import { useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../common/SlideArrow';

const MemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 27rem;
  width: 17rem;
  /* box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1); */
  background-color: var(--bg-dark-color);
  border-radius: 20px;
  justify-content: space-between;
  color: var(--main-font-color);
`;

const MemberCardHeader = styled.div`
  width: 100%;
  padding-top: 1.5rem;
  padding-left: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  > .user-info--name {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
    color: var(--main-font-color);
    font-size: 0.875rem;
    font-weight: 500;

    > span {
      margin-left: 0.5rem;
    }
  }
`;

const PetSlideBox = styled(ColCenterBox)`
  color: var(--main-font-color);
  width: 100%;
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
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  padding: 0 1.5rem;
  > .slick-list {
    width: 100%;
  }
`;

const MateMemberCard = ({ member }) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    nextArrow: <NextArrow size="24" />,
    prevArrow: <PrevArrow size="24" />,
  };

  const dispatch = useDispatch();

  const handleClickMember = () => {
    dispatch(
      openModal({ type: 'member', props: { memberId: member.memberId } })
    );
  };

  return (
    <MemberCard>
      <MemberCardHeader>
        <button onClick={() => handleClickMember()} className="user-info--name">
          <ProfileImage
            size="20px"
            src={member?.profileImage?.upFileUrl}
          ></ProfileImage>
          <span>{member.nickName}</span>
        </button>
      </MemberCardHeader>
      <PetSlideBox>
        {!member?.petsInfo || member.petsInfo.length === 0 ? (
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
          <StyledSlider {...settings}>
            {member?.petsInfo.map((pet) => {
              return (
                <div key={pet.petId}>
                  <MatePetSlideCard pet={pet} />
                </div>
              );
            })}
          </StyledSlider>
        )}
      </PetSlideBox>
    </MemberCard>
  );
};

export default MateMemberCard;
