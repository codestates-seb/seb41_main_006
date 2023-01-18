import styled from 'styled-components';
import MeetingWalk from '../../static/images/MeetingWalk.png';
import MeetingList from '../../static/images/MeetingList.png';
import Fade from 'react-reveal/Fade';

const MainSecondContainer = styled.div`
  display: flex;
  height: 80vh;
  align-items: center;
  text-align: right;
  img {
    width: 55%;
    height: 40%;
    padding-left: 10%;
  }
  .MeetingWalk {
    width: 60%;
    height: 50%;
    background-image: url(${MeetingWalk});
    background-size: 80%;
    background-repeat: no-repeat;
    h2 {
      font-size: 2rem;
    }
    div {
      font-weight: 500;
    }
  }
`;
const MainThirdPage = () => {
  return (
    <MainSecondContainer>
      <Fade left>
        <div className="MeetingWalk">
          <h2>산책 메이트를 직접 찾아보세요</h2>
          <div>
            여러 친구들과 산책을 하고 싶으신가요?<br></br> 모임을 만들어보세요!
          </div>
        </div>
      </Fade>
      <Fade right>
        <img src={MeetingList} alt="" />
      </Fade>
    </MainSecondContainer>
  );
};

export default MainThirdPage;
