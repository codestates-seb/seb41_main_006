import styled from 'styled-components';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import { FINDMATE_ENDPOINT } from '../../api/findMate';
// import useFetch from '../../hooks/useFetch';
import dummyBoards from '../../api/board/dummyBoards';

const MapBox = styled.div`
  width: 100%;
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
`;

const MapContent = styled.div`
  width: 99%;
  height: 500px;
`;

const { kakao } = window;

const Map = ({ searchPlace, setLocInfo, setEditPlace }) => {
  const { boardId } = useParams();

  const location = useLocation();

  // const data = useFetch(`${FINDMATE_ENDPOINT}/${boardId}`);
  // let boardList;

  // if (data) {
  //   boardList = data.response;
  //   console.log(boardList);
  // }

  useEffect(() => {
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(
        Number(dummyBoards.data[0].y),
        Number(dummyBoards.data[0].x)
      ), // boardList.y, boardList.x
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places();

    // 마커 커스텀
    const imgSrc =
        'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb9mhL8%2FbtrWBcjqH22%2FEERoT6xVXkSTCAwvT5X7Z0%2Fimg.png',
      imgSize = new kakao.maps.Size(45, 50);

    const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize),
      markerPosition = new kakao.maps.LatLng(
        dummyBoards.data[0].y,
        dummyBoards.data[0].x
      );

    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImg,
    });

    // 글 수정 페이지에서는 기존 위치 좌표를 기준으로 마커 표시함
    if (location.pathname === `/mate/boards/${boardId}/edit`) {
      marker.setMap(map);
    }

    // 1. 키워드로 장소 검색
    const placesSearchCB = (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds);
      }
    };

    ps.keywordSearch(searchPlace, placesSearchCB);

    const geocoder = new kakao.maps.services.Geocoder();

    let bCode, lat, lng; // 법정 코드, 위도, 경도 변수

    // 법정 코드, 위도, 경도 값 저장
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        bCode = result[0].address.b_code;
        lng = result[0].address.x;
        lat = result[0].address.y;

        if (location.pathname === '/newmate') {
          setLocInfo([bCode, lng, lat]);
        } else {
          setEditPlace([bCode, lng, lat]);
        }
      }
    };

    // 검색한 장소에 마커 표시
    const displayMarker = (place) => {
      console.log(place);
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: markerImg,
      });

      // 마커 클릭 시 인포윈도우 표시
      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          '<div style="padding: 5px; font-size: 12px;">' +
            `<a href="${place.place_url}">` +
            place.place_name +
            '</a>' +
            '</div>' +
            '<div style="padding: 5px; font-size: 12px;">' +
            place.address_name +
            '</div>'
        );
        infowindow.open(map, marker);

        // 마커 클릭 시 지번 주소를 이용해서 법정 코드, 위도, 경도 값을 가져옴
        geocoder.addressSearch(place.address_name, callback);
      });

      // 장소 검색한 후 클릭으로 새로운 장소 지정 시 기존 마커 제거
      kakao.maps.event.addListener(map, 'click', function () {
        marker.setMap(null);
      });
    };

    // 2. 지도 클릭으로 장소 지정
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const content =
            '<div style="padding: 5px; font-size: 12px;">' +
            result[0].address.address_name +
            '</div>';

          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
        // 지도 클릭 시 지번 주소를 이용해서 법정 코드 값을 가져옴
        geocoder.addressSearch(result[0].address.address_name, callback);
      });
    });

    const searchDetailAddrFromCoords = (coords, callback) => {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    };
  }, [searchPlace]);

  return (
    <MapBox>
      <MapContent id="map"></MapContent>
    </MapBox>
  );
};

export default Map;
