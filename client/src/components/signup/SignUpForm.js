import { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import AuthInput from '../common/AuthInput';
import {
  emailValidate,
  passwordValidate,
  confirmPasswordValidate,
} from '../../utils/signUpValidate';
import styled from 'styled-components';
import Button from '../common/Button';
import EmailAuthModal from './EmailAuthModal';

const SSignUpForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  > .email-container {
    display: flex;
    flex-direction: column;
    position: relative;
  }
`;

const SignUpForm = () => {
  // value 지정
  const email = useInput('');
  const password = useInput('');
  const confirmPassword = useInput('');
  // 제출 시 loading 상태
  const [isLoading, setIsLoading] = useState(false);
  // 이메일 인증 부분 open
  const [isEmailAuthModlOpen, setIsEmailAuthModalOpen] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

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

  const handleEmailAuthOpenClick = () => {
    const emailError = emailValidate(email.value);
    if (emailError) {
      email.setError(emailError);
    } else {
      alert('해당 메일로 인증 메일을 전송했습니다.');
      setIsEmailAuthModalOpen(true);
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
      if (!email.error && !password.error && !confirmPassword.error) {
        alert('회원가입 완료');
      } else {
        setIsLoading(false);
      }
    }
  }, [isLoading]);

  return (
    <SSignUpForm onSubmit={handleSubmit}>
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
      <Button size="large" type="submit" fullWidth>
        시작
      </Button>
      {isEmailAuthModlOpen ? (
        <EmailAuthModal
          email={email.value}
          setIsEmailAuthModalOpen={setIsEmailAuthModalOpen}
          setIsEmailVerified={setIsEmailVerified}
        />
      ) : null}
    </SSignUpForm>
  );
};

export default SignUpForm;
