import React, { useState } from 'react';
import axios from 'axios';
import ItemCard from './ListItem';

function TouristSpotList() {
	const [spotData, setSpotData] = useState({});
	const [isLoaded, setLoading] = useState(false);
	
	axios.get('https://openapi.mnd.go.kr/sample/json/DS_MND_GUN_WLFRINSTLTN_SRNDT/1/5/')
		.then((data) => {
			console.log(data);
			setSpotData({
				data: data,
			});
			setLoading(true);
	});
	
	if(isLoaded) {
		return <p>Loading...</p>
	}
		
	return (
		<ItemCard
			titile={spotData.rel_instltnnm}
			description={spotData.instltnpstn}
		/>
	)
}

export default TouristSpotList;