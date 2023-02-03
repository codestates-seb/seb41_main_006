import styled from 'styled-components';
import Slider from 'react-slick';
import { useQuery } from 'react-query';
import { getMyPetList } from '../api/pet/pet';
import PageLoading from './PageLoading';
import { BrownDog } from './common/DogSvg';

const MainContainer = styled.div`
  .slider {
    width: 720px;
    .slick-prev::before,
    .slick-next::before {
      color: var(--main-font-color);
    }
  }
`;

const Container = styled.div`
  padding: 0 5px;
`;

const InfoContainer = styled.li`
  background-color: var(--main--bgcolor);
  text-align: center;
  width: 100%;
  padding: 20px 0;
  border: 2px solid var(--sec-color);
  border-radius: 10px;
  margin-top: 20px;
  float: left;

  &.selected {
    color: white;
    background-color: var(--sec-color);
  }

  &.newSelected {
    color: white;
    background-color: var(--sec-color);
  }

  img,
  svg {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin: 0px 10px;
  }
  .pet-name {
    margin-top: 5px;
  }
  span {
    margin: 0 2px;
  }
`;

const settings = {
  className: 'slider variable-width',
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
};

const GetDogInfo = ({ selectedPetId, petId, setPetid }) => {
  // 멤버 정보 조회
  const {
    data: petList,
    isLoading,
    isError,
  } = useQuery(
    ['myPets'],
    async () => await getMyPetList({ page: 1, size: 10 }),
    {
      placeholderData: [],
    }
  );

  // 강아지 아이디
  const handlePetId = (idx) => {
    const selectedDiv = document.getElementsByClassName('selected');
    const newSelectedDiv = document.getElementsByClassName('newSelected');

    if (selectedDiv[0]) {
      selectedDiv[0].classList.remove('selected');
    }
    if (newSelectedDiv[0]) {
      newSelectedDiv[0].classList.add('newSelected');
    }
    setPetid(idx);
  };

  return (
    <>
      {isError && <div>강아지 정보 불러오기 실패</div>}
      {isLoading ? (
        <PageLoading />
      ) : (
        <MainContainer>
          <ul>
            <Slider {...settings}>
              {petList.map((pet) => {
                return (
                  <Container key={pet.petId}>
                    <InfoContainer
                      pats={pet}
                      className={
                        pet.petId === petId
                          ? 'newSelected'
                          : selectedPetId === pet.petId
                          ? 'selected'
                          : ''
                      }
                      onClick={() => handlePetId(pet.petId)}
                    >
                      {pet?.profileImage ? (
                        <img
                          src={pet?.profileImage?.upFileUrl}
                          alt="petimage"
                        />
                      ) : (
                        <BrownDog></BrownDog>
                      )}
                      <div className="pet-name">{pet.name}</div>
                      <div>
                        <span>{pet.gender === 'M' ? '남' : '여'}</span>
                        <span>|</span>
                        <span>{pet.age}살</span>
                        <span>|</span>
                        <span>{pet.breed}</span>
                      </div>
                    </InfoContainer>
                  </Container>
                );
              })}
            </Slider>
          </ul>
        </MainContainer>
      )}
    </>
  );
};

export default GetDogInfo;
