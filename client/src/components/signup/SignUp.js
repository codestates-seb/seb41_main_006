import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';
import AuthInput from '../common/AuthInput';
import {
  emailValidate,
  passwordValidate,
  confirmPasswordValidate,
} from '../../utils/signUpValidate';
import styled from 'styled-components';
import Title from '../common/Title';
import Button from '../common/Button';
import EmailAuthModal from './EmailAuthModal';
import { useNavigate } from 'react-router-dom';
import { authEmail } from '../../api/member/signup';

const SignUpInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  height: 30rem;

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

const SignUpBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;

  > .email-container {
    display: flex;
    flex-direction: column;
    position: relative;

    > .email-verified-msg {
      font-size: 0.75rem;
      color: var(--main-color);
      padding-left: 0.675rem;
    }
  }
`;

const SignUp = ({ email, password, confirmPassword }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLoginClick = () => dispatch(openModal({ type: 'login' }));
  // 제출 시 loading 상태
  const [isLoading, setIsLoading] = useState(false);
  // 이메일 인증 부분 open
  const [isEmailAuthModalOpen, setIsEmailAuthModalOpen] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const handleCheckEmail = (event) => {
    const { value } = event.target;
    email.setError(emailValidate(value));
  };

  const handleCheckPassword = (event) => {
    const { value } = event.target;
    password.setError(passwordValidate(value));
  };

  const handleCheckConfirmPassword = (event) => {
    const { value } = event.target;
    confirmPassword.setError(confirmPasswordValidate(value, password.value));
  };

  const handleSubmit = (event) => {
    // 기본 동작 방지
    event.preventDefault();

    // loading 상태로
    setIsLoading(true);
    // 값들 다시 한번 점검
    email.setError(emailValidate(email.value));
    password.setError(passwordValidate(password.value));
    confirmPassword.setError(
      confirmPasswordValidate(confirmPassword.value, password.value)
    );

    if (email.value && !isEmailVerified) {
      email.setError('이메일 인증이 완료되지 않았습니다');
    }
  };

  const handleEmailAuthOpenClick = async () => {
    // 인증 메일 발송 중이라면 다시 요청 못하게 막는다.
    if (isEmailLoading) return;

    const emailError = emailValidate(email.value);
    if (emailError) {
      email.setError(emailError);
    } else {
      setIsEmailLoading(true);
      setIsEmailAuthModalOpen(true);
      try {
        await authEmail(email.value);
        email.setError('');
      } catch (err) {
        if (err.status === 409) {
          email.setError('이미 가입된 이메일 입니다.');
        }
        setIsEmailAuthModalOpen(false);
      }
      setIsEmailLoading(false);
    }
  };

  // 비밀번호, 비밀번호 확인 일치하는지 확인
  useEffect(() => {
    if (!confirmPassword.value) {
      confirmPassword.setError('');
    } else if (password.value !== confirmPassword.value) {
      confirmPassword.setError('비밀번호가 일치하지 않습니다.');
    } else {
      confirmPassword.setError('');
    }
  }, [password.value, confirmPassword.value]);

  useEffect(() => {
    if (isLoading) {
      if (
        !email.error &&
        !password.error &&
        !confirmPassword.error &&
        isEmailVerified
      ) {
        navigate('/signup/memberInfo');
      } else {
        setIsLoading(false);
      }
    }
  }, [isLoading]);

  return (
    <SignUpInputContainer>
      <Title as="h1" size="large" className="title">
        회원가입
      </Title>
      <SignUpBox>
        <div className="email-container">
          <AuthInput
            className="email-input"
            label="이메일"
            type="text"
            id="loginEmail"
            name="email"
            value={email.value}
            error={email.error}
            onChange={email.handleChange}
            onBlur={handleCheckEmail}
            placeholder="이메일을 입력하세요"
            auth={true}
            onClick={handleEmailAuthOpenClick}
          ></AuthInput>
          {isEmailVerified ? (
            <p className="email-verified-msg">인증 완료!</p>
          ) : null}
        </div>
        <AuthInput
          label="비밀번호"
          type="password"
          id="loginPW"
          name="password"
          value={password.value}
          error={password.error}
          onChange={password.handleChange}
          onBlur={handleCheckPassword}
          placeholder="비밀번호 입력"
        ></AuthInput>
        <AuthInput
          label="비밀번호 확인"
          type="password"
          id="loginPW2"
          name="confirmPassword"
          value={confirmPassword.value}
          error={confirmPassword.error}
          onChange={confirmPassword.handleChange}
          onBlur={handleCheckConfirmPassword}
          placeholder="비밀번호 확인"
        ></AuthInput>
        <Button type="button" onClick={handleSubmit} size="large" fullWidth>
          시작
        </Button>
        {isEmailAuthModalOpen ? (
          <EmailAuthModal
            email={email.value}
            setIsEmailAuthModalOpen={setIsEmailAuthModalOpen}
            setIsEmailVerified={setIsEmailVerified}
            isEmailLoading={isEmailLoading}
            setIsEmailLoading={setIsEmailLoading}
          />
        ) : null}
      </SignUpBox>
      <div className="text-container">
        <div>회원이신가요?</div>
        <button type="button" onClick={handleLoginClick}>
          로그인
        </button>
      </div>
    </SignUpInputContainer>
  );
};

export default SignUp;
