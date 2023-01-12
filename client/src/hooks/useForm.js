import { useState, useEffect } from 'react';

/**
 * @param {Object} form
 * @param {Object} form.initialValues 초기 상태값
 * @param {Function} form.onSubmit 제출 시 작동하는 함수
 * @param {Function} form.validate value 검증하는 함수
 * @returns
 */
function useForm({ initialValues, onSubmit, validate }) {
  // values 관리
  const [values, setValues] = useState(initialValues);
  // 에러 : 에러가 있는 input이 있다면
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

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setIsLoading(false);
  };

  useEffect(() => {
    // submit 중...
    if (isLoading) {
      // 만약 에러가 없다면
      if (Object.keys(errors).length === 0) {
        // 제출 작업 한다.
        onSubmit(values);
      }
      // 에러가 있다면 submit 취소
      setIsLoading(false);
    }
  }, [errors]);

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleReset,
  };
}

export default useForm;
