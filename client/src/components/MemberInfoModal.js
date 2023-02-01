import { useEffect, useState } from 'react';
import { getMemberInfo } from '../api/member/member';
import styled from 'styled-components';
import MemberInfoCard from './myPage/MemberInfoCard';
import PetInfoCard from './myPage/PetInfoCard';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeModal } from '../store/modules/modalSlice';
import { GrayDog } from './common/DogSvg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import authRequest from '../api/authRequest';
import { PrevArrow, NextArrow } from './common/SlideArrow';

const SContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 46em;
  height: 28rem;
  background-color: var(--bg-color);
  border-radius: 10px;
  padding: 1rem;

  > .memberInfo-container {
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

const PetSlideBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  color: var(--main-font-color);
  flex: 1;
  height: 100%;
  width: 100%;

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
  justify-content: center;
  position: relative;
  padding: 0 2.5rem;
  > .slick-list {
    width: 100%;
    height: 100%;
    > .slick-track {
      width: 100%;
      height: 100%;
    }
  }

  .slick-slide {
    width: 100%;
    height: 100%;
  }
`;

const MemberInfoModal = ({ memberId }) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    nextArrow: <NextArrow size="40" />,
    prevArrow: <PrevArrow size="40" />,
  };
  const [member, setMember] = useState({
    petsInfo: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModal = () => {
    dispatch(closeModal());
  };

  const AddChatList = async (memberId) => {
    await authRequest
      .post('/chats', {
        memberId: memberId,
      })
      .then((data) => console.log(data));
  };

  useEffect(() => {
    getMemberInfo(memberId)
      .then((data) => {
        setMember(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [memberId]);

  return (
    <SContainer>
      <div className="memberInfo-container">
        <MemberInfoCard memberInfo={member} />
        <Button
          onClick={() => {
            handleModal();
            AddChatList(member.memberId);
            navigate('/chat');
          }}
        >
          채팅하기
        </Button>
      </div>
      <div className="petInfo-container">
        <h2>강아지 소개</h2>
        <PetSlideBox>
          {!member.petsInfo || member.petsInfo.length === 0 ? (
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
                return <PetInfoCard key={pet.petId} pet={pet} />;
              })}
            </StyledSlider>
          )}
        </PetSlideBox>
      </div>
    </SContainer>
  );
};

export default MemberInfoModal;
