import styled from 'styled-components';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const SelectBox = styled.div`
  width: 100%;
  position: relative;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 12px;
  background-color: #ffffff;
  color: var(--sec-color);
  border: 1px solid rgb(167, 150, 137, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > svg {
    font-size: 1rem;
  }

  &.selected {
    color: var(--main-color);
    border: 1.5px solid var(--main-color);
  }
`;

const SelectOptionList = styled.ul`
  position: absolute;
  list-style: none;
  top: 2.6rem;
  z-index: 10;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: max-content;
  padding: 0;
  border-radius: 8px;
  background-color: white;
  color: var(--sec-color);
  border: 1px solid rgb(167, 150, 137, 0.4);
`;

const Label = styled.label`
  font-size: 1rem;
`;

const OptionItem = styled.li`
  font-size: 14px;
  width: 100%;
  transition: background-color 0.1s ease-in;
  color: var(--sec-color);
  &:hover {
    color: var(--main-font-color);
  }

  > button {
    width: 100%;
    height: 2rem;
    color: inherit;
  }
`;

const Select = ({ curValue, handleSelect, selectList }) => {
  const curTitle = selectList.find((el) => el.value === curValue)?.title;
  const [isShowOptions, setShowOptions] = useState(false);

  return (
    <SelectBox
      onClick={() => {
        setShowOptions(!isShowOptions);
      }}
      className={curValue ? 'selected' : ''}
    >
      <Label htmlFor="true">{curValue ? curTitle : '선택'}</Label>
      {isShowOptions ? (
        <SelectOptionList>
          {selectList.map((el) => (
            <OptionItem
              name={el.name}
              value={el.value}
              onClick={handleSelect}
              key={el.id}
            >
              <button name={el.name} value={el.value} onClick={handleSelect}>
                {el.title}
              </button>
            </OptionItem>
          ))}
        </SelectOptionList>
      ) : (
        ''
      )}
      <FiChevronDown />
    </SelectBox>
  );
};

export default Select;
