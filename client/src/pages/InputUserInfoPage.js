import styled from 'styled-components';
import Container from '../components/Container';
import EditUserInfoCard from '../components/myPage/EditUserInfoCard';

const SContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;
const SInputInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: var(--main-font-color);
  font-weight: 500;
  .next-button {
    line-height: 50px;
    border: 0;
    border-radius: 10px;
    background-color: var(--main-color);
    font-size: 1.5rem;
    color: white;
    margin: 20px 0;
  }
`;

const InputUserInfoPage = () => {
  return (
    <SContainer>
      <SInputInfoContainer>
        <EditUserInfoCard />
        <button className="next-button">가입 완료</button>
      </SInputInfoContainer>
    </SContainer>
  );
};

export default InputUserInfoPage;
