import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from './ListItem';

function TouristSpotList() {
	const [spotData, setSpotData] = useState(null);
	const [isLoaded, setLoading] = useState(false);
	
	try {
		useEffect(() => {
			axios.get('/sample/json/DS_MND_GUN_WLFRINSTLTN_SRNDT/1/5/')
				.then((fetchData) => {
					for(const tourSpot of fetchData.data.DS_MND_GUN_WLFRINSTLTN_SRNDT.row) {
						setSpotData(tourSpot);
						console.log(tourSpot)
					}
					setLoading(true);
			});
		}, []);
	}
	catch(e) {
		console.log(e);
	}
	
	if(!isLoaded) {
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