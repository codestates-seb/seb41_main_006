import { useEffect } from 'react';

const { kakao } = window;

const Map = ({ searchPlace }) => {
  useEffect(() => {
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    const placesSearchCB = (data, status) => {
      console.log('data', data);
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

    // 지도 위에 마커 표시
    const displayMarker = (place) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

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
      });
    };
  }, [searchPlace]);

  return (
    <div
      style={{
        width: '100%',
        display: 'inline-block',
        marginLeft: '5px',
        marginRight: '5px',
      }}
    >
      <div id="map" style={{ width: '99%', height: '500px' }}></div>
    </div>
  );
};

export default Map;
