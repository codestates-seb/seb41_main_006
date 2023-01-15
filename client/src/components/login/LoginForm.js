import { useEffect, useState } from 'react';
import Button from '../common/Button';
import AuthInput from '../common/AuthInput';
import useInput from '../../hooks/useInput';
import loginValidate from '../../utils/loginValidate';

const LoginForm = () => {
  const email = useInput('');
  const password = useInput('');
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (isLoading) {
      if (!email.error && !password.error) {
        alert('로그인!');
      } else {
        setIsLoading(false);
      }
    }
  }, [isLoading]);

  return (
    <form onSubmit={handleSubmit}>
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
      <Button fullWidth>로그인</Button>
    </form>
  );
};

export default LoginForm;
