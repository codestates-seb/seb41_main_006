import { isEmailValid, isPasswordValid } from './validateFunctions';

export const emailValidate = (email) => {
  let error = '';
  if (!email) {
    error = '이메일이 입력되지 않았습니다.';
  } else if (!isEmailValid(email)) {
    error = '올바른 이메일이 아닙니다.';
  }
  return error;
};

export const passwordValidate = (password) => {
  let error = '';
  if (!password) {
    error = '비밀번호가 입력되지 않았습니다.';
  } else if (!isPasswordValid(password)) {
    error = '8~16자 영문 대소문자, 숫자, 특수문자를 사용하세요.';
  }

  return error;
};

export const confirmPasswordValidate = (confirmPw, pw) => {
  let error = '';

  if (!confirmPw) {
    error = '확인을 위해 비밀번호를 다시 입력해주세요.';
  } else if (confirmPw !== pw) {
    error = '비밀번호가 일치하지 않습니다.';
  }

  return error;
};
