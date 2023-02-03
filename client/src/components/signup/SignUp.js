import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';
import AuthInput from '../common/AuthInput';
import signUpValidate from '../../utils/signUpValidate';
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
      color: var(--success-color);
      padding-left: 0.675rem;
    }
  }
`;

const SignUp = ({ email, password, confirmPassword }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLoginClick = () => dispatch(openModal({ type: 'login' }));
  // 제출 시 loading 상태
  // const [isLoading, setIsLoading] = useState(false);
  // 이메일 인증 부분 open
  const [isEmailAuthModalOpen, setIsEmailAuthModalOpen] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const handleCheckEmail = (event) => {
    const { value } = event.target;
    email.setError(signUpValidate.email(value));
  };

  const handleCheckPassword = (event) => {
    const { value } = event.target;
    password.setError(signUpValidate.password(value));
  };

  const handleCheckConfirmPassword = (event) => {
    const { value } = event.target;
    confirmPassword.setError(
      signUpValidate.confirmPassword(value, password.value)
    );
  };

  const handleSubmit = (event) => {
    // 기본 동작 방지
    event.preventDefault();

    // 이메일 입력했는데 인증이 안된 상태라면
    if (email.value && !isEmailVerified) {
      email.setError('이메일 인증이 완료되지 않았습니다');
      return;
    }

    // 값들 다시 한번 점검
    const emailError = signUpValidate.email(email.value);
    const passwordError = signUpValidate.password(password.value);
    const confirmPasswordError = signUpValidate.confirmPassword(
      confirmPassword.value,
      password.value
    );

    if (emailError || passwordError || confirmPasswordError) {
      if (emailError) email.setError(emailError);
      if (passwordError) password.setError(passwordError);
      if (confirmPasswordError) confirmPassword.setError(confirmPasswordError);

      return;
    }

    // 모든 과정이 완료되었으면 정보 입력 화면으로 간다.
    navigate('/signup/memberInfo');
  };

  const handleEmailAuthOpenClick = async () => {
    // 인증 메일 발송 중이라면 다시 요청 못하게 막는다.
    if (isEmailLoading) return;

    const emailError = signUpValidate.email(email.value);
    if (emailError) {
      email.setError(emailError);
    } else {
      setIsEmailLoading(true);
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
    if (isEmailLoading) {
      setIsEmailAuthModalOpen(true);
    }
  }, [isEmailLoading]);

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
