import { useEffect, useState, useRef } from 'react';
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
import instance from '../api/axiosConfig';
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
  flex-direction: column;
  align-items: center;
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
    display: flex;
    align-items: center;

    // 양쪽에 달린 화살표 디자인
    .slick-prev::before,
    .slick-next::before {
      color: var(--main-color);
      background-color: none;
      height: 1000px;
    }

    .slick-disabled::before {
      background-color: red;
    }

    > .slick-list {
      width: 16rem;
      height: 100%;

      > .slick-track {
        height: 100%;

        > div {
          width: 16rem;
          height: 100%;
        }
      }
    }
  }
`;

const MemberInfoModal = ({ memberId }) => {
  const slideRef = useRef();
  const settings = {
    className: 'slider variable-width',
    ref: slideRef,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    swipeToSlide: false,
    nextArrow: <NextArrow size="45" />,
    prevArrow: <PrevArrow size="45" />,
  };
  const [member, setMember] = useState({
    petsInfo: [],
  });
  const AccessToken = localStorage.getItem('AccessToken');
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleModal = () => {
    dispatch(closeModal());
  };

  const AddChatList = async (memberId) => {
    await instance
      .post(
        '/chats',
        {
          memberId: memberId,
        },
        {
          headers: { Authorization: AccessToken },
        }
      )
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
            Navigate('/chat');
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
            <Slider {...settings}>
              {member?.petsInfo.map((pet) => {
                return (
                  <div key={pet.petId}>
                    <PetInfoCard pet={pet} />
                  </div>
                );
              })}
            </Slider>
          )}
        </PetSlideBox>
      </div>
    </SContainer>
  );
};

export default MemberInfoModal;
