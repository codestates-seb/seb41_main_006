import styled from 'styled-components';
import { IoLocationSharp } from 'react-icons/io5';
import { BiTargetLock } from 'react-icons/bi';
// import { findMateGet } from '../../api/findMate';

const SearchAddress = ({ setAddress }) => {
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value === '') {
        return;
      }
      setAddress(e.target.value);
    }
  };

  // 현재 위치로 목록 받아오기
  const { kakao } = window;

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
              console.log('법정 코드', result[0].code);
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

  const handleLocClick = () => {
    geoFind();
  };

  return (
    <SearchAddressBox>
      <IoLocationSharp className="location-icon" />
      <AdderssInput
        type="text"
        placeholder="시/도 또는 시/군/구 또는 읍/면/동 이름을 검색하세요"
        onKeyUp={handleKeyUp}
      ></AdderssInput>
      <LocationButton onClick={handleLocClick}>
        <BiTargetLock />
        현재 위치
      </LocationButton>
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

export default SearchAddress;
