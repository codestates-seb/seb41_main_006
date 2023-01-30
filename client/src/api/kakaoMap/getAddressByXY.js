const { kakao } = window;

const getAddressByXY = async (x, y) => {
  // 좌표로 주소 얻기
  const geocoder = new kakao.maps.services.Geocoder();
  const coord = new kakao.maps.LatLng(y, x);

  return new Promise((resolve, reject) => {
    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(result[0].address.address_name);
      } else {
        reject(status);
      }
    });
  });
};

export default getAddressByXY;
