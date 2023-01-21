import useOnClickOutside from '../../hooks/useOnClickOutside';
import styled from 'styled-components';
import { IoLocationSharp } from 'react-icons/io5';
import { BiTargetLock } from 'react-icons/bi';
import { useRef, useState } from 'react';
import getAddressList from '../../api/kakaoMap/getAddressList';
import getAddressByGeo from '../../api/kakaoMap/getAddressByGeo';

const SearchAddress = ({ setAddress, setBCode, setIsLoading }) => {
  const searchResultRef = useRef();
  const [searchAddress, setSearchAddress] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [isAddressListOpen, setIsAddressListOpen] = useState(false);
  // 검색 결과 창 밖 클릭하면 닫힘
  useOnClickOutside(searchResultRef, () => setIsAddressListOpen(false));

  // 검색어에 맞는 주소 결과(주소, 코드) 리스트 받아옴
  const handleSearchAddressKeyUp = async (e) => {
    if (e.key === 'Enter') {
      if (e.target.value === '') {
        return;
      }

      try {
        const result = await getAddressList(e.target.value);
        setAddressList(result);
        setIsAddressListOpen(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // 현재 위치를 기반으로 해당하는 주소와 법정 코드 받아옴
  const handleLocClick = async () => {
    // geoFind();
    setIsLoading(true);

    try {
      const result = await getAddressByGeo();
      setBCode(result.code);
      setAddress(result.address_name);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickSearchResult = (index) => {
    // input value 초기화
    setSearchAddress(addressList[index].addressName);
    // 선택한 결과의 배열 index를 이용해 화면에 출력할 주소명과 서버에 보낼 법정 코드를 설정
    // 주소명
    setAddress(addressList[index].addressName);
    // 법정 코드
    setBCode(addressList[index].bCode);
    // 검색창 닫고 초기화
    setIsAddressListOpen(false);
    setAddressList([]);
  };

  return (
    <SearchAddressBox>
      <IoLocationSharp className="location-icon" />
      <AdderssInput
        type="text"
        placeholder="동 이름을 검색하세요"
        onKeyUp={handleSearchAddressKeyUp}
        value={searchAddress}
        onChange={(e) => setSearchAddress(e.target.value)}
      ></AdderssInput>
      <LocationButton onClick={handleLocClick}>
        <BiTargetLock />
        현재위치
      </LocationButton>
      {isAddressListOpen && (
        <SearchResultBox ref={searchResultRef}>
          {addressList.length === 0 ? (
            <div>검색 결과가 없습니다.</div>
          ) : (
            <ul>
              {addressList.map((el, idx) => (
                <SearchResultItem
                  key={el.id}
                  onClick={() => handleClickSearchResult(idx)}
                >
                  <IoLocationSharp className="location-icon" />
                  {el.addressName}
                </SearchResultItem>
              ))}
            </ul>
          )}
        </SearchResultBox>
      )}
    </SearchAddressBox>
  );
};

const SearchAddressBox = styled.div`
  width: 100%;
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
`;

const AdderssInput = styled.input`
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
`;

const LocationButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  color: var(--main-font-color);
  font-size: 1rem;
  font-weight: 600;
  > svg {
    margin-right: 0.5rem;
  }
`;

const SearchResultBox = styled.div`
  position: absolute;
  z-index: 9;
  background-color: white;
  width: 100%;
  height: max-content;
  top: 3.6rem;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 1.25rem;
  border-radius: 10px;

  > div {
    width: 100%;
    color: var(--sec-color);
  }
`;

const SearchResultItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  gap: 0.8rem;
  color: var(--sec-color);

  &:hover {
    color: var(--main-font-color);
  }
`;

export default SearchAddress;
