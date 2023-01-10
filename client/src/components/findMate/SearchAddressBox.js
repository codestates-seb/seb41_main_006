import styled from 'styled-components';
import { IoLocationSharp } from 'react-icons/io5';
import { BiTargetLock } from 'react-icons/bi';

const SSearchAddressBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  height: 3.5rem;
  border-radius: 10px;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-right: 1rem;
  gap: 1rem;
  margin-bottom: 1rem;

  > .location-icon {
    position: absolute;
    color: var(--main-color);
    font-size: 1.5rem;
    left: 1rem;
  }

  > input {
    flex: 1;
    border-radius: 10px;
    height: 100%;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    padding-left: 3rem;
    border: none;
    color: var(--main-font-color);
    font-size: 1rem;
    &::placeholder {
      color: var(--sec-color);
      font-size: 1rem;
    }
  }

  > button {
    display: flex;
    align-items: center;
    border: none;
    background: none;
    color: var(--main-font-color);
    font-size: 1rem;
    font-weight: 600;
    gap: 8px;
  }
`;

const SearchAddressBox = ({ address, setAddress }) => {
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      if (address === '') {
        return;
      }
      console.log(address);
      setAddress(e.target.value);
    }
  };
  return (
    <SSearchAddressBox>
      <IoLocationSharp className="location-icon" />
      <input
        type="text"
        value={address}
        placeholder="동 이름을 검색하세요"
        onChange={(e) => setAddress(e.target.value)}
        onKeyUp={handleKeyUp}
      ></input>
      <button>
        <BiTargetLock />
        현재 위치
      </button>
    </SSearchAddressBox>
  );
};

export default SearchAddressBox;
