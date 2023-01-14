import { useState, useEffect } from 'react';

/**
 * @param {Object} form
 * @param {Object} form.initialValues 초기 상태값
 * @param {Function} form.onSubmit 제출 시 작동하는 함수
 * @param {Function} form.validate value 검증하는 함수
 * @returns
 */
function useForm({ initialValues, onSubmit, validateList, validateFunctions }) {
  // 각 input의 value
  const [values, setValues] = useState(initialValues);
  // 각 input의 에러
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /** 입력 란에서 발생하는 변경 이벤트를 다루는 함수 */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  /** 입력 란 focus 해제 이벤트를 다루는 함수 실행 */
  // 이메일, 비밀번호, 비밀번호 유효성 검사
  const validateValue = (event) => {
    const { name, value } = event.target;
    setErrors({ ...errors, [name]: validateFunctions[name](value) });
  };

  /** 제출 이벤트를 다루는 함수 */
  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    // 유효성 검사가 필요한 input에 대하여 검사 실시
    const newErrors = {};
    for (let val of validateList) {
      let errMsg = validateFunctions[val](values[val]);
      // 유효하지 않은 값이 존재함
      if (errMsg) {
        newErrors[val] = errMsg;
      }
    }
    setErrors(newErrors);
  };

  useEffect(() => {
    // submit 중임
    if (isLoading) {
      // 만약 에러가 없다면
      if (Object.keys(errors).length === 0) {
        // 제출 작업 한다.
        onSubmit(values);
      }
      // 에러가 있다면 submit 취소
      setIsLoading(false);
    }
  }, [isLoading]);

  return {
    values,
    errors,
    isLoading,
    handleChange,
    validateValue,
    handleSubmit,
  };
}

export default useForm;
