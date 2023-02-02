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
  overflow: visible;

  > .slick-list {
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
`;
const PrevButton = styled.button`
  color: var(--main-font-color);
  width: 3rem;
  height: 100%;
`;

function SlideNextButton({ onClick }) {
  return (
    <NextButton onClick={onClick}>
      <HiArrowRight />
    </NextButton>
  );
}

function SlidePrevButton({ onClick }) {
  return (
    <PrevButton onClick={onClick}>
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
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    swipeToSlide: false,
    nextArrow: <SlideNextButton />,
    prevArrow: <SlidePrevButton />,
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
