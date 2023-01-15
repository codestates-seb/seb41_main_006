import styled from 'styled-components';
import Container from '../components/Container';
import { useDispatch } from 'react-redux';
import { openModal } from '../store/modules/modalSlice';
import SignUpForm from '../components/signup/SignUpForm';

const SignUpContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const SInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 50%;
  margin-top: 100px;
  .title {
    text-align: center;
    color: var(--main-font-color);
    font-size: 2rem;
    font-weight: 500;
  }
  .text-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    > div {
      color: #a5a5a5;
      font-size: 1rem;
    }

    > button {
      color: var(--sec-color);
      font-weight: 500;
      font-size: 1rem;
    }
  }
  > button {
    line-height: 40px;
    border: 0;
    border-radius: 10px;
    background-color: var(--main-color);
    color: white;
    margin: 15px 0;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const SignUpPage = () => {
  const dispatch = useDispatch();
  const handleLoginClick = () => dispatch(openModal({ type: 'login' }));

  return (
    <SignUpContainer>
      <SInputContainer>
        <div className="title">회원가입</div>
        <SignUpForm />
        <div className="text-container">
          <div>회원이신가요?</div>
          <button onClick={handleLoginClick}>로그인</button>
        </div>
      </SInputContainer>
    </SignUpContainer>
  );
};

export default SignUpPage;
