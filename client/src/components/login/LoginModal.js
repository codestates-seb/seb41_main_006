import styled from 'styled-components';
import LoginForm from './LoginForm';
import Button from '../common/Button';
import Title from '../common/Title';

const SLoginModal = styled.div`
  width: 30rem;
  height: 35rem;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 70%;
  gap: 1rem;

  > .text-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    > span {
      color: #a5a5a5;
      font-size: 1rem;
    }

    > a {
      color: var(--sec-color);
      font-weight: 500;
      font-size: 1rem;
    }
  }
`;

const LoginModal = () => {
  return (
    <SLoginModal>
      <LoginContainer>
        <Title as="h1" size="large">
          로그인
        </Title>
        <LoginForm />
        <Button size="medium" outline fullWidth>
          게스트로 이용하기
        </Button>
        <div className="text-container">
          <span>아직 회원이 아니라면?</span>
          <a href="/signup">회원가입</a>
        </div>
      </LoginContainer>
    </SLoginModal>
  );
};

export default LoginModal;
