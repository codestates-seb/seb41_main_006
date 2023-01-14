import styled from 'styled-components';
import { useState } from 'react';

const SelectBox = styled.div`
  margin-left: 24px;
  flex-grow: 1;
  position: relative;
  height: 30px;
  padding: 4px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &::before {
    content: '⌵';
    position: absolute;
    top: -3px;
    right: 8px;
    color: var(--main-font-color);
    font-size: 20px;
  }
`;
const SelectOptions = styled.ul`
  list-style: none;
  top: 18px;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 130px;
  padding: 0;
  border-radius: 8px;
  background-color: var(--bg-color);
  color: var(--main-font-color);
  border: 1px solid var(--main-font-color);
`;

const Label = styled.label`
  font-size: 15px;
`;
const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: var(--main-font-color);
    color: white;
  }
`;

const SelectAge = () => {
  const [isShowOptions, setShowOptions] = useState(false);
  const [currentValue, setCurrentValue] = useState('');

  const handleSelectValue = (e) => {
    setCurrentValue(e.target.textContent);
  };

  return (
    <SelectBox
      onClick={() => {
        setShowOptions(!isShowOptions);
      }}
    >
      <Label htmlFor="true">
        {currentValue ? currentValue : '연령대 선택'}
      </Label>
      {isShowOptions ? (
        <SelectOptions>
          <Option
            role="presentation"
            onClick={handleSelectValue}
            onKeyPress={() => {}}
          >
            10대
          </Option>
          <Option
            role="presentation"
            onClick={handleSelectValue}
            onKeyPress={() => {}}
          >
            20대
          </Option>
          <Option
            role="presentation"
            onClick={handleSelectValue}
            onKeyPress={() => {}}
          >
            30대
          </Option>
          <Option
            role="presentation"
            onClick={handleSelectValue}
            onKeyPress={() => {}}
          >
            40대 이상
          </Option>
        </SelectOptions>
      ) : (
        ''
      )}
    </SelectBox>
  );
};

export default SelectAge;
