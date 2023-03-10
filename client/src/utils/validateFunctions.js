// 이메일 형식
const EMAIL_RULE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//영문, 숫자, 특수문자 혼합하여 8~20자리 이내의 비밀번호
const PASSWORD_RULE =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
// '한글, 영어를 사용하여 10자 이내로 작성해주세요.
const NAME_RULE = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;

// 이메일 형식에 맞는지 검사
export const isEmailValid = (email) => {
  return EMAIL_RULE.test(email);
};

export const isPasswordValid = (password) => {
  return PASSWORD_RULE.test(password);
};

export const isNotNumber = (value) => {
  const regExp = /[a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
  return regExp.test(value);
};

export const isNameValid = (name) => {
  return NAME_RULE.test(name);
};
