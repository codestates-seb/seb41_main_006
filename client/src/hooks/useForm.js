import { useState, useEffect } from 'react';

// 이후 유저 가입 폼으로 사용하면 좋을듯
/**
 * @param {Object} form
 * @param {Object} form.initialValues 초기 상태값
 * @param {Function} form.onSubmit 제출 시 작동하는 함수
 * @param {Function} form.validate  제출 시 value 검증하는 함수
 * @returns
 */
function useForm({ initialValues, onSubmit, validate }) {
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

  /** 제출 이벤트를 다루는 함수 */
  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    setErrors(validate(values));
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
    handleSubmit,
  };
}

export default useForm;
