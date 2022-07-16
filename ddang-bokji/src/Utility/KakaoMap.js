import React from 'react';

function KakaoMap(props) {
	const { kakao } = window;
	const { name, address, style } = props;
	
	const container = document.getElementById('map');
	if(container) {
		const geocoder = new kakao.maps.services.Geocoder();
		geocoder.addressSearch(address, function(result, status) {
			// 장소 검색에 성공했을 경우, 그 위치를 표시
			if (status === kakao.maps.services.Status.OK) {
				const position = new kakao.maps.LatLng(result[0].y, result[0].x);
				const options = {
					center: position,
					level: 3
				};
				const map = new kakao.maps.Map(container, options);
				new kakao.maps.Marker({
					map,
					position
				})
			}
			
			// 장소 검색에 실패했을 경우, 이름으로 검색
			const placeSearcher = new kakao.maps.services.Places();
			placeSearcher.keywordSearch(name, function(data, status, pagination) {
				if (status === kakao.maps.services.Status.OK) {
					const position = new kakao.maps.LatLng(data[0].y, data[0].x);
					const options = {
						center: position,
						level: 3
					};
					const map = new kakao.maps.Map(container, options);
					new kakao.maps.Marker({
						map,
						position
					})
				}
				
				// 이름 검색도 실패했을 경우 아무거나 출력
				const options = {
					center: new kakao.maps.LatLng(33.450701, 126.570667),
					level: 13
				};
				new kakao.maps.Map(container, options);
			});
		});
	}
	
	return (
		<div id="map" style={style}></div>
	);
}

function kakaoMapURL(name, setState) {
	const { kakao } = window;
	const placeSearcher = new kakao.maps.services.Places();
	
	placeSearcher.keywordSearch(name, function(data, status, pagination) {
		if (status === kakao.maps.services.Status.OK) {
			setState("https://place.map.kakao.com/" + data[0].id);
		}
	});
};

export default KakaoMap;
export { kakaoMapURL };