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
import EmailAuth from './EmailAuth';

const SSignUpForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const SignUpForm = () => {
  // value 지정
  const email = useInput('');
  const password = useInput('');
  const confirmPassword = useInput('');
  // 제출 시 loading 상태
  const [isLoading, setIsLoading] = useState(false);
  // 이메일 인증 부분 open
  const [isEmailAuthOpen, setIsEmailAuthOpen] = useState(false);

  const handleCheckEmail = (event) => {
    const { value } = event.target;
    email.setError(emailValidate(value));
    setIsEmailAuthOpen(true);
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

  useEffect(() => {
    // 이메일을 작성했고 이메일에 대한 에러가 없다면
    if (email.value && !email.error) {
      // 이메일 인증 화면이 열린다.
      setIsEmailAuthOpen(true);
    } else {
      setIsEmailAuthOpen(false);
    }
  }, [email.error]);

  return (
    <SSignUpForm onSubmit={handleSubmit}>
      <AuthInput
        label="이메일"
        type="text"
        id="loginEmail"
        name="email"
        value={email.value}
        error={email.error}
        onChange={email.handleChange}
        onBlur={handleCheckEmail}
        placeholder="이메일을 입력하세요"
      ></AuthInput>
      {isEmailAuthOpen ? <EmailAuth /> : null}
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
    </SSignUpForm>
  );
};

export default SignUpForm;
