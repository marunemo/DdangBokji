import React, { useState, useEffect } from 'react';
import { Layout, Image, Typography } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LoadingSpin from '../Utility/LoadingSpin';

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
	
	if(!isLoaded)
		return <LoadingSpin />;
	
	return (
		<Layout>
			<Layout.Content>
				<Image
					width="100%"
					height="100%"
					alt={spotInfo.phototitle}
					src={spotInfo.image_file}
					// Empty icons created by LAFS - Flaticon
					fallback="https://cdn-icons.flaticon.com/png/512/3586/premium/3586675.png?token=exp=1656836791~hmac=9ab5c8883e35964c0a42820f9065b528"
				/>
				<Typography>
					<Typography.Text>
						이름 : {spotInfo.rel_instltnnm}\
						주소 : {spotInfo.instltnpstn}\
						전화 : {spotInfo.cntadr}
					</Typography.Text>
				</Typography>
			</Layout.Content>
			<Layout.Sider>
			</Layout.Sider>
		</Layout>
	);
}

export default TouristSpotInfo;