const { kakao } = window;

const getAddressByGeo = async () => {
  // 현재 위치 파악해서 x, y 좌표 얻기

  let lat = 0;
  let lng = 0;

  if (navigator.geolocation) {
    const position = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    lat = position.coords.latitude;
    lng = position.coords.longitude;
  } else {
    // Geolocation API에 액세스할 수 없으면 다른 좌표(서울 시청) 좌표 리턴
    lat = 37.566353;
    lng = 126.977953;
  }
  // 좌표로 주소 얻기
  const geocoder = new kakao.maps.services.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.coord2address(lng, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(result[0]);
      } else {
        reject(status);
      }
    });
  });
};

export default getAddressByGeo;
