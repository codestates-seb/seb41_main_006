import styled from 'styled-components';
import Container from '../components/Container';
import PetInfo from '../components/PetInfo';

const SContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--main-font-color);
  .Tap-container {
    margin: 10% 0 5% 0;
    width: 70%;
    display: flex;
    justify-content: space-around;
    height: 5%;
    button {
      background-color: rgba(167, 150, 137, 0.4);
      width: 15%;
      border: none;
      text-align: center;
      border-radius: 5px;
      height: 25px;
      cursor: pointer;
      :hover {
        background-color: var(--main-font-color);
        color: white;
      }
    }
  }
`;

const MyPage = () => {
  return (
    <SContainer>
      <div className="Tap-container">
        <button>나의 정보</button>
        <button>강아지 정보</button>
        <button>나의 모임</button>
        <button>알림</button>
      </div>
      <PetInfo />
    </SContainer>
  );
};

export default MyPage;
