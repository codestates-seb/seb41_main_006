export default function petInfoValidate({
  name,
  age,
  gender,
  breed,
  petSize,
  aboutDog,
}) {
  const errors = {};

  if (!name) {
    errors.name = '필수 항목입니다.';
  } else if (name.length > 10) {
    errors.name = '이름은 10자 이내로 작성해주세요';
  }

  if (!age) {
    errors.age = '필수 항목입니다.';
  }
  if (!gender) {
    errors.gender = '필수 항목입니다.';
  }
  if (!breed) {
    errors.breed = '필수 항목입니다.';
  }
  if (!petSize) {
    errors.petSize = '필수 항목입니다.';
  }
  if (aboutDog.length > 40) {
    errors.aboutDog = '40자를 초과하였습니다.';
  }
  return errors;
}
