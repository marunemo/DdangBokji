import React, { useEffect } from 'react';

function KakaoMap(props) {
	const { kakao } = window;
	const { address } = props;
	
	useEffect(() => {
		const container = document.getElementById('map');
		
		const geocoder = new kakao.maps.services.Geocoder();
		geocoder.addressSearch(address, function(result, status) {
		 	if (status === kakao.maps.services.Status.OK) {
				const options = {
					center: new kakao.maps.LatLng(result[0].y, result[0].x),
					level: 3
				};
				return new kakao.maps.Map(container, options);
			}
			
			const options = {
				center: new kakao.maps.LatLng(33.450701, 126.570667),
				level: 13
			};
			const map = new kakao.maps.Map(container, options);
			return map;
		});
	}, []);
	
	return (
		<div id="map" style={{ width: '500px', height: '400px' }}></div>
	);
}

export default KakaoMap;