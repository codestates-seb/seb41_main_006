import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/modules/modalSlice';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import Button from '../common/Button';
import Title from '../common/Title';
import { login } from '../../api/member/login';
import { wrongInput } from '../../alert';

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
  padding-top: 2rem;
  width: 60%;
  height: 80%;
  gap: 1rem;

  > .text-container {
    display: flex;
    align-items: center;
    justify-content: center;

    > span {
      color: #a5a5a5;
      font-size: 1rem;
      margin-right: 1rem;
    }

    > a {
      color: var(--sec-color);
      font-weight: 500;
      font-size: 1rem;
    }
  }
`;

const LoginModal = ({ setIsLogin }) => {
  const dispatch = useDispatch();
  const handleGuestLogin = async () => {
    const email = process.env.REACT_APP_GUEST_EMAIL;
    const password = process.env.REACT_APP_GUEST_PASSWORD;

    try {
      await login(email, password);
      setIsLogin(true);
      dispatch(closeModal());
    } catch (e) {
      if (
        e.response.data.message === 'Member Not Found' ||
        e.response.data.message === '자격 증명에 실패하였습니다.'
      ) {
        wrongInput();
      }
    }
  };

  return (
    <SLoginModal>
      <LoginContainer>
        <Title as="h1" size="large">
          로그인
        </Title>
        <LoginForm setIsLogin={setIsLogin} />
        <Button onClick={handleGuestLogin} size="medium" outline fullWidth>
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
