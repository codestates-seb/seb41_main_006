const { kakao } = window;

/**
 * 검색어에 맞는 주소와 법정 코드를 얻는 함수
 * @param {string} address 검색어
 * @returns {Promise} 검색 성공 시 검색어에 맞는 대한 주소(범위는 법정동), 법정 코드에 대한 리스트를 반환
 */
const getAddressList = (address) => {
  // 주소 - 좌표 변환 객체
  const geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표 검색하기 -> 법정 코드 값 가져오기
  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        resolve(
          result.reduce((acc, cur) => {
            // 동 주소까지 존재한다면 (검색 범위가 넓거나 행정 주소라면 'region_3depth_name' 존재하지 않는다.)
            // 필요한 데이터만 원하는 형태로 저장함

            if (cur?.address?.region_3depth_name) {
              acc.push({
                id: acc.length + 1,
                // 주소명
                name: `${cur.address.region_1depth_name} ${cur.address.region_2depth_name} ${cur.address.region_3depth_name}`,
                // 법정 코드
                code: cur.address.b_code,
              });
            }
            return acc;
          }, [])
        );
      } else {
        reject(status);
      }
    });
  });
};

export default getAddressList;
