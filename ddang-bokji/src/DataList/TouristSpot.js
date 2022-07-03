import React, { useState, useEffect } from 'react';
import { Spin, Space, Typography } from 'antd';
import axios from 'axios';
import ItemCard from '../Utility/ListItem';
import ItemGrid from '../Utility/ItemGrid';

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
		return(
			<Space
				style={{
					width: '100%',
					height: '100%',
					justifyContent: 'center'
				}}
				direction="horizontal"
				align="center"
				size="middle"
			>
				<Spin size="large" />
				<Typography.Title
					style={{ color: 'red' }}
					level={2}
				>
					Loading...
				</Typography.Title>
			</Space>
		);
	}
		
	return <ItemGrid items={spotData} />;
}

export default TouristSpotList;