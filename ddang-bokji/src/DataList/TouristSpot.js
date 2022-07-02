import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import axios from 'axios';
import ItemCard from './ListItem';

function TouristSpotList() {
	const [spotData, setSpotData] = useState([]);
	const [isLoaded, setLoading] = useState(false);
	
	try {
		useEffect(() => {
			axios.get('/sample/json/DS_MND_GUN_WLFRINSTLTN_SRNDT/1/5/')
				.then((fetchData) => {
					const tourSpots = fetchData.data.DS_MND_GUN_WLFRINSTLTN_SRNDT.row.map((tourSpot) => {
						return (
							<ItemCard
								title={tourSpot.rel_instltnnm}
								description={tourSpot.instltnpstn}
								photoImage={tourSpot.image_file}
								imageDesc={tourSpot.phototitle}
							/>
						)
					})
					setSpotData(tourSpots);
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
		
	return spotData;
}

export default TouristSpotList;