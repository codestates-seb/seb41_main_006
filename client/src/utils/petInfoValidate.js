export default function memberInfoValidate({
  name,
  age,
  gender,
  breed,
  petSize,
}) {
  const errors = {};

  if (!name) {
    errors.name = '필수 항목입니다.';
  }
  if (!age) {
    errors.age = '필수 항목입니다.';
  }
  if (!gender) {
    errors.gender = '필수 항목입니다.';
  }
  if (!breed) {
    errors.address = '필수 항목입니다.';
  }
  if (!petSize) {
    errors.gender = '필수 항목입니다.';
  }

  return errors;
}