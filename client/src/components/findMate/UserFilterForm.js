import { useMemo, useState } from 'react';
import userFilterList from '../../static/userFilterList';
import styled from 'styled-components';
import Button from '../common/Button';
import { RowCenterBox } from '../FlexBoxs';

const UserFilterLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    border: none;
    cursor: pointer;
    background-color: white;
    padding: 0.3rem 1rem;
    color: var(--sec-color);
    border-radius: 2rem;
    font-weight: 600;
    box-shadow: 2px 2px 10px rgba(1, 1, 1, 0.1);
  }

  input:checked + span {
    border: solid 1px var(--sec-color);
  }
`;

const UserFilterForm = () => {
  // 체크 박스의 경우 값을 배열로 관리하기 위해 초기 값 지정
  const initialValues = useMemo(() => {
    const init = {};
    userFilterList.map((el) => {
      if (el.type === 'checkbox') init[el.name] = [];
      else if (el.type === 'radio') init[el.name] = '';
    });
    return init;
  }, [userFilterList]);

  const [filterValues, setFilterValues] = useState(initialValues);

  /** checkbox 의 change 핸들러 함수 */
  // checkbox는 여러 개 선택할 수 있으므로 배열로 값을 관리하기 때문에 다른 동작이 필요
  const handleCheckboxChange = (event) => {
    // 변동된 input의 name, value, checked 값을 확인
    const { name, value, checked } = event.target;

    // 만약 체크가 되었다면
    if (checked) {
      // name에 해당하는 배열에 새로운 value를 추가해준다!
      setFilterValues({
        ...filterValues,
        [name]: [...filterValues[name], value],
      });
    } else {
      // 체크를 취소한다면
      // name에 해당하는 배열에서 value를 제거한다.
      setFilterValues({
        ...filterValues,
        [name]: filterValues[name].filter((el) => el !== value),
      });
    }
  };

  /** 기본적인 input change 핸들러 함수 */
  const handleChange = (event) => {
    const { name, value } = event.target;
    // 가장 최신의 값으로 업데이트 한다.
    setFilterValues({ ...filterValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filterValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      {userFilterList.map((el) => {
        return (
          <div key={el.id}>
            <div>{el.title}</div>
            <RowCenterBox>
              {el.inputList.map((input) => {
                return (
                  <UserFilterLabel key={input.id}>
                    <input
                      type={el.type}
                      name={el.name}
                      value={input.value}
                      onChange={
                        el.type === 'checkbox'
                          ? handleCheckboxChange
                          : handleChange
                      }
                    />
                    <span>{input.label}</span>
                  </UserFilterLabel>
                );
              })}
            </RowCenterBox>
          </div>
        );
      })}
      <Button type="submit" color="second" size="medium" fullWidth>
        적용하기
      </Button>
    </form>
  );
};

export default UserFilterForm;
