// import { useState } from 'react';
import { useQuery } from 'react-query';
import { getMyPetList } from '../../api/pet/pet';
import { GrayDog } from '../common/DogSvg';
import EditPetInfoCard from './EditPetInfoCard';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HiArrowRight, HiArrowLeft } from 'react-icons/hi';
import EditPetModal from './Modal/EditPetModal';
import { useState } from 'react';

const NoPetBox = styled.div`
  width: 100%;
  height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  > .dog-face {
    width: 13rem;
    height: 16rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  > .no-pets-msg {
    margin-top: 1rem;
    font-weight: 500;
  }
`;

const StyledSlider = styled(Slider)`
  position: relative;
  width: 90%;
  height: 100%;
  display: flex;
  padding: 0 3rem;

  .slick-list {
    width: 100%;
  }

  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const NextButton = styled.button`
  color: var(--main-font-color);
  width: 3rem;
  height: 100%;
  position: absolute;
  right: 0;
  border-radius: 0 10px 10px 0;
  &.slick-disabled {
    visibility: hidden;
  }

  &:hover {
    background-color: var(--bg-dark-color);
  }
`;
const PrevButton = styled.button`
  color: var(--main-font-color);
  width: 3rem;
  height: 100%;
  position: absolute;
  left: 0;
  border-radius: 10px 0 0 10px;
  &.slick-disabled {
    visibility: hidden;
  }

  &:hover {
    background-color: var(--bg-dark-color);
  }
`;

function SlideNextButton({ onClick }) {
  return (
    <NextButton
      onClick={onClick}
      className={onClick === null ? 'slick-disabled' : ''}
    >
      <HiArrowRight />
    </NextButton>
  );
}

function SlidePrevButton({ onClick }) {
  return (
    <PrevButton
      onClick={onClick}
      className={onClick === null ? 'slick-disabled' : ''}
    >
      <HiArrowLeft />
    </PrevButton>
  );
}

const PetList = () => {
  const { data: petList, isLoading } = useQuery(
    ['myPets'],
    async () => await getMyPetList({ page: 1, size: 10 }),
    {
      placeholderData: [],
    }
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPet, setEditPet] = useState({});

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    swipeToSlide: false,
    nextArrow: <SlideNextButton />,
    prevArrow: <SlidePrevButton />,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) {
    <div>...loading</div>;
  }

  return !petList || petList?.length === 0 ? (
    <NoPetBox>
      <div className="dog-face">
        <GrayDog></GrayDog>
      </div>
      <div className="no-pets-msg">현재 등록된 강아지가 없어요!</div>
    </NoPetBox>
  ) : (
    <>
      <StyledSlider {...settings}>
        {petList?.map((el) => (
          <EditPetInfoCard
            key={el.petId}
            pet={el}
            setEditPet={setEditPet}
            setIsEditModalOpen={setIsEditModalOpen}
          />
        ))}
      </StyledSlider>
      {isEditModalOpen ? (
        <EditPetModal pet={editPet} setIsEditModalOpen={setIsEditModalOpen} />
      ) : null}
    </>
  );
};

export default PetList;
