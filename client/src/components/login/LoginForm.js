import Button from '../common/Button';
import AuthInput from '../common/AuthInput';
import useForm from '../../hooks/useForm';
import loginValidate from '../../utils/loginValidate';

const LoginForm = () => {
  const { values, errors, handleChange, handleSubmit, validateValue } = useForm(
    {
      initialValues: { email: '', password: '' },
      onSubmit: () => {
        alert('로그인 완료!');
      },
      validateList: ['email', 'password'],
      validateFunctions: loginValidate,
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <AuthInput
        label="이메일"
        type="text"
        id="loginEmail"
        name="email"
        value={values.email}
        error={errors.email}
        onChange={handleChange}
        onBlur={validateValue}
        placeholder="이메일을 입력하세요"
      ></AuthInput>
      <AuthInput
        label="비밀번호"
        type="password"
        id="loginPw"
        name="password"
        value={values.password}
        error={errors.password}
        onChange={handleChange}
        onBlur={validateValue}
        placeholder="비밀번호를 입력하세요"
      ></AuthInput>
      <Button fullWidth>로그인</Button>
    </form>
  );
};

export default LoginForm;
