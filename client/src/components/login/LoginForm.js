import { useEffect, useState } from 'react';
import AuthInput from '../common/AuthInput';
import useInput from '../../hooks/useInput';
import loginValidate from '../../utils/loginValidate';
import styled from 'styled-components';
import Button from '../common/Button';
import instance from '../../api/axiosConfig';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/modules/modalSlice';

const SLoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LoginForm = ({ setIsLogin }) => {
  const email = useInput('');
  const password = useInput('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCheckEmail = (event) => {
    const { value } = event.target;
    email.setError(loginValidate.email(value));
  };

  const handleCheckPassword = (event) => {
    const { value } = event.target;
    password.setError(loginValidate.password(value));
  };

  const handleSubmit = async (event) => {
    // 기본 동작 방지
    event.preventDefault();

    // loading 상태로
    setIsLoading(true);
    // 유효성 검증
    email.setError(loginValidate.email(email.value));
    password.setError(loginValidate.password(password.value));
  };
  const handleLogin = async () => {
    await instance
      .post('/auth/login', {
        username: email.value,
        password: password.value,
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem('AccessToken', data.headers.authorization);
        localStorage.setItem('refreshToken', data.headers.refresh);
        localStorage.setItem('memberId', data.data.memberId);
        setIsLogin(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (isLoading) {
      if (!email.error && !password.error) {
        alert('로그인 성공!');
        dispatch(closeModal());
      } else {
        setIsLoading(false);
      }
    }
  }, [isLoading]);

  return (
    <SLoginForm onSubmit={handleSubmit}>
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
      <AuthInput
        label="비밀번호"
        type="password"
        id="loginPw"
        name="password"
        value={password.value}
        error={password.error}
        onChange={password.handleChange}
        onBlur={handleCheckPassword}
        placeholder="비밀번호를 입력하세요"
      ></AuthInput>
      <Button size="large" fullWidth type="submit" onClick={handleLogin}>
        로그인
      </Button>
    </SLoginForm>
  );
};

export default LoginForm;
