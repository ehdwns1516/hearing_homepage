/* global kakao */
import React, { useEffect } from 'react';

const KakaoMap = () => {
  useEffect(() => {
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(37.26595, 127.00175),
      level: 3,
    };

    let map = new window.kakao.maps.Map(container, options);
    let markerPosition = new kakao.maps.LatLng(37.26595, 127.00175);
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    kakao.maps.event.addListener(marker, 'click', () => {
      console.log('first');
      window.open('https://place.map.kakao.com/12510627', '_blank');
    });
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    new kakao.maps.CustomOverlay({
      map: map,
      content:
        '<div style="padding:0 5px;background:rgba( 255, 255, 255, 1 ); border-radius: 10px; border: 2px solid grey">오티콘보청기 수원점</div>',
      position: new kakao.maps.LatLng(37.26595, 127.00175), // 커스텀 오버레이를 표시할 좌표
      xAnchor: 0.5, // 컨텐츠의 x 위치
      yAnchor: 2.7, // 컨텐츠의 y 위치
    });
  }, []);

  return <div></div>;
};

export default KakaoMap;
