import Container from '../Container';
import Mainbackground from '../../static/images/MainBackground.png';
import styled, { keyframes } from 'styled-components';
import { PostSubmitBtn } from '../../components/Button';
import { Link } from 'react-router-dom';

const BackFade = keyframes`
  0% {
    opacity: 0;
    top: 20px;
 
  }
  50% {
    opacity: 0;
    top: 400px;
  }
  100% {
    opacity: 1;
    top: 20px;
  }
`;

const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${Mainbackground});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  animation: ${BackFade} 1.5s linear alternate;
  .Comment-Container {
    text-align: center;
    font-size: 2rem;
    color: var(--main-font-color);
    font-weight: 700;
    button {
      width: 50%;
      border-radius: 50px;
      font-size: 1.2rem;
      font-weight: 500;
    }
  }
`;

const MainFirstPage = () => {
  return (
    <MainContainer>
      <div className="Comment-Container">
        <div>
          우리 동네 다양한 친구들과<br></br> 같이 산책을 즐겨보세요.
        </div>
        <Link to="/mate">
          <PostSubmitBtn>산책 메이트 찾기</PostSubmitBtn>
        </Link>
      </div>
    </MainContainer>
  );
};

export default MainFirstPage;
