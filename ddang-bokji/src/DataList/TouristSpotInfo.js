import React, { useState, useEffect } from 'react';
import { Spin, Space, Typography } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TouristSpotInfo({ match }) {
	const { id } = useParams();
	const [spotInfo, setSpotInfo] = useState({});
	const [isLoaded, setLoading] = useState(false);

	try {
		useEffect(() => {
			axios.get(`/${process.env.REACT_APP_MND_TOKEN}/json/DS_MND_GUN_WLFRINSTLTN_SRNDT/${id}/${id}/`)
				.then((fetchData) => {
					setSpotInfo(fetchData.data.DS_MND_GUN_WLFRINSTLTN_SRNDT.row[0]);
					setLoading(true);
			});
		}, [id]);
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
	return JSON.stringify(spotInfo);
}

export default TouristSpotInfo;