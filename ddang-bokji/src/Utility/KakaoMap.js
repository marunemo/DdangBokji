import React, { useEffect } from 'react';

function KakaoMap() {
	const { kakao } = window;
	
	useEffect(() => {
		const container = document.getElementById('map');
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 13
		};
		const map = new kakao.maps.Map(container, options);
	}, []);
	
	return (
		<div id="map" style={{ width: '500px', height: '400px' }}></div>
	);
}

export default KakaoMap;