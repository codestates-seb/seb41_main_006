import AuthInput from '../common/AuthInput';
import useInput from '../../hooks/useInput';
import loginValidate from '../../utils/loginValidate';
import styled from 'styled-components';
import Button from '../common/Button';
import { login } from '../../api/member/login';
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
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCheckEmail = (event) => {
    const { value } = event.target;
    email.setError(loginValidate.email(value));
  };

  const handleCheckPassword = (event) => {
    const { value } = event.target;
    password.setError(loginValidate.password(value));
  };

  const handleLogin = async () => {
    try {
      await login(email.value, password.value);
      setIsLogin(true);
      dispatch(closeModal());
    } catch (e) {
      //이메일 비밀번호 틀린 오류는 여기서 잡아야함
      if (
        e.response.data.message === 'Member Not Found' ||
        e.response.data.message === '자격 증명에 실패하였습니다.'
      ) {
        alert('이메일과 비밀 번호를 정확히 입력해 주세요');
      }
    }
  };

  const handleSubmit = async (event) => {
    // 기본 동작 방지
    event.preventDefault();

    const emailError = loginValidate.email(email.value);
    const passwordError = loginValidate.password(password.value);

    if (emailError || passwordError) {
      if (emailError) {
        email.setError(emailError);
      }

      if (passwordError) {
        password.setError(passwordError);
      }

      return;
    }

    await handleLogin();
  };

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
      <Button size="large" fullWidth type="submit">
        로그인
      </Button>
    </SLoginForm>
  );
};

export default LoginForm;
