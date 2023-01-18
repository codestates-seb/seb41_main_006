import AroundWalkDog from '../../static/images/AroundWalkDog.png';
import AroundWalk from '../../static/images/AroundWalk.png';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

const MainSecondContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80vh;
  img {
    width: 40%;
    height: 40%;
  }
  .Around-Walk-dog {
    width: 60%;
    height: 40%;
    margin-left: 10%;
    background-image: url(${AroundWalkDog});
    background-size: 90%;
    background-repeat: no-repeat;
    h2 {
      font-size: 2rem;
      padding-left: 5%;
    }
    div {
      padding-top: 3%;
      padding-left: 5%;
      font-weight: 500;
    }
  }
`;

const MainSecondPage = () => {
  return (
    <MainSecondContainer>
      <Fade left>
        <img src={AroundWalk} alt="" />
      </Fade>
      <Fade right>
        <div className="Around-Walk-dog">
          <h2>
            외로운 강아지에게<br></br> 친구를 소개해주세요.
          </h2>
          <div>
            나의 반려 동물에게 산책할 친구가 필요한가요?<br></br> 주변에서 바로
            찾아 볼 수 있습니다!
          </div>
        </div>
      </Fade>
    </MainSecondContainer>
  );
};

export default MainSecondPage;
