import { useState } from 'react';

/**
 * @param {Object} form
 * @param {Object} form.initialValues 초기 상태값
 * @param {Function} form.onSubmit 제출 시 작동하는 함수
 * @param {Array} form.validateList 유효성 검사가 필요한 input list
 * @param {Object} form.validateFunctions value 검증하는 함수들
 * @returns
 */
function useInput(initailValue) {
  // 각 input의 value
  const [value, setValue] = useState(initailValue);
  const [error, setError] = useState('');

  /** 입력 란에서 발생하는 변경 이벤트를 다루는 함수 */
  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  return {
    value,
    error,
    setError,
    handleChange,
  };
}

export default useInput;
