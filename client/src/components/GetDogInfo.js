import styled from 'styled-components';
import Slider from 'react-slick';
import useFetch from '../hooks/useFetch';
import PageLoading from './PageLoading';

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

  img {
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

const GetDogInfo = ({ loginMemberId, setPetid }) => {
  // 멤버 정보 조회
  const [data, isLoading, error] = useFetch(
    `${process.env.REACT_APP_SERVER_API}/members/${loginMemberId}`
  );

  let board;
  if (data) {
    board = data.data;
    console.log(board);
  }

  // 강아지 아이디
  const handlePetId = (idx) => {
    setPetid(idx);
  };

  return (
    <>
      {error && <div>강아지 정보 불러오기 실패</div>}
      {isLoading ? (
        <PageLoading />
      ) : (
        <MainContainer>
          <ul>
            <Slider {...settings}>
              {board.petsInfo.map((pet) => {
                return (
                  <Container Key={pet.index}>
                    <InfoContainer
                      Key={pet.index}
                      pats={pet}
                      onClick={() => handlePetId(pet.petId)}
                    >
                      <img
                        src="https://i.ibb.co/Rj5b3xs/Kakao-Talk-Photo-2023-01-12-00-46-38.jpg"
                        alt="petimage"
                      />
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
