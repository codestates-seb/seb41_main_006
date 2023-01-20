import useOnClickOutside from '../../hooks/useOnClickOutside';
import styled from 'styled-components';
import { IoLocationSharp } from 'react-icons/io5';
import { BiTargetLock } from 'react-icons/bi';
import { useRef, useState } from 'react';

const SearchAddress = ({ setAddress, setBCode }) => {
  const searchResultRef = useRef();
  const [addressList, setAddressList] = useState([]);
  const [isAddressListOpen, setIsAddressListOpen] = useState(false);
  // 검색 결과 창 밖 클릭하면 닫힘
  useOnClickOutside(searchResultRef, () => setIsAddressListOpen(false));
  // 주소 검색 함수
  const { kakao } = window;

  // 1. 검색어로 주소 정보 받아오기 - 동 이름을 검색하도록 한다.
  const getAddressCode = (address) => {
    // 주소 - 좌표 변환 객체
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표 검색하기 -> 법정 코드 값 가져오기
    geocoder.addressSearch(address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setAddressList(
          result.reduce((acc, cur) => {
            // 동 주소까지 존재한다면 (검색 범위가 넓거나 행정 주소라면 'region_3depth_name' 존재하지 않는다.)
            // 필요한 데이터만 원하는 형태로 저장함
            if (cur.address.region_3depth_name) {
              acc.push({
                id: acc.length + 1,
                // 주소명
                addressName: `${cur.address.region_1depth_name} ${cur.address.region_2depth_name} ${cur.address.region_3depth_name}`,
                // 법정 코드
                bCode: cur.address.b_code,
              });
            }
            return acc;
          }, [])
        );
        // setAddressList(result);
        // console.log('여기!', result);
        // const bCode = result[0].address.b_code;
        // console.log(result[0].address.address_name);
        // console.log(bCode);
      }
    });
  };

  // 2. 현재 위치로 주소 정보 받아오기
  const geoFind = () => {
    // 현재 위치 파악해서 x, y 좌표 얻기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude; // 위도
          const lng = position.coords.longitude; // 경도

          // 좌표로 주소 얻기
          const geocoder = new kakao.maps.services.Geocoder();
          const coord = new kakao.maps.LatLng(lat, lng);

          const callback = function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              setBCode(result[0].code);
              setAddress(result[0].address_name);
            }
          };

          geocoder.coord2RegionCode(coord.getLng(), coord.getLat(), callback);
        },
        (err) => {
          console.log(err.message);
        }
      );
    }
  };

  // 주소 검색
  const handleSearchAddressKeyUp = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value === '') {
        return;
      }

      setIsAddressListOpen(true);
      getAddressCode(e.target.value);
    }
  };

  const handleLocClick = () => {
    geoFind();
  };

  const handleClick = () => {};

  return (
    <SearchAddressBox>
      <IoLocationSharp className="location-icon" />
      <AdderssInput
        type="text"
        placeholder="시/도 또는 시/군/구 또는 읍/면/동 이름을 검색하세요"
        onKeyUp={handleSearchAddressKeyUp}
      ></AdderssInput>
      <LocationButton onClick={handleLocClick}>
        <BiTargetLock />
        현재 위치
      </LocationButton>
      {isAddressListOpen && (
        <SearchResultBox ref={searchResultRef}>
          {addressList.length === 0 ? (
            <div>검색 결과가 없습니다.</div>
          ) : (
            <ul>
              {addressList.map((el, idx) => (
                <SearchResultItem key={idx} onClick={handleClick}>
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
  gap: 8px;
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
