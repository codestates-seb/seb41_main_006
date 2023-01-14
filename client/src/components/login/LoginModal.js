import styled from 'styled-components';
import LoginForm from './LoginForm';
import Button from '../common/Button';

const SLoginModal = styled.div`
  width: 30rem;
  height: 35rem;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  background-color: aliceblue;
  width: 60%;
  height: 70%;
`;

const LoginModal = () => {
  return (
    <SLoginModal>
      <LoginContainer>
        <LoginForm />
        <Button fullWidth>게스트로 이용하기</Button>
        <span>아직 회원이 아니라면?</span>
        <a href="/signup">회원가입</a>
      </LoginContainer>
    </SLoginModal>
  );
};

export default LoginModal;
