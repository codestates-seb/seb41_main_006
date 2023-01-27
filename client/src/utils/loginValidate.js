import { isEmailValid } from './validateFunctions';

const loginValidate = {
  email: (email) => {
    let error = '';
    if (!email) {
      error = '이메일이 입력되지 않았습니다.';
    } else if (!isEmailValid(email)) {
      error = '올바른 이메일이 아닙니다.';
    }

    return error;
  },

  password: (password) => {
    let error = '';
    if (!password) {
      error = '비밀번호가 입력되지 않았습니다.';
      //errors = '8~16자 영문 대소문자, 숫자, 특수문자를 사용하세요.';
    }

    return error;
  },
};

export default loginValidate;
