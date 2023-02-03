export default function memberInfoValidate({
  nickName,
  memberAge,
  address,
  gender,
}) {
  const errors = {};

  if (!nickName) {
    errors.nickName = '필수 항목입니다.';
  } else if (nickName.length > 10) {
    errors.name = '이름은 10자 이내로 작성해주세요';
  }
  if (!memberAge) {
    errors.memberAge = '필수 항목입니다.';
  }
  if (!address) {
    errors.address = '필수 항목입니다.';
  }
  if (!gender) {
    errors.gender = '필수 항목입니다.';
  }

  return errors;
}
