import React, { useState, useEffect } from 'react';
import { Layout, Image, Typography, List, Comment, Avatar } from 'antd';
import { UserOutlined, RollbackOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LoadingSpin from '../Utility/LoadingSpin';
import KakaoMap from '../Utility/KakaoMap';

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
	
	const comments = [
		{
			author: 'test',
			content: 'test1',
			datetime: '1234.56.78'
		},
		{
			author: 'test',
			content: 'test2',
			datetime: '2468.10.12'
		}
	]
	
	return (
		<Layout style={styles.infoLayout}>
			<Layout.Header>
				<RollbackOutlined style={{ color: '#fff' }} />
			</Layout.Header>
			<Layout style={styles.mainLayout}>
				<Layout.Content style={styles.contentLayout}>
					<Image
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
					<KakaoMap />
				</Layout.Content>
				<Layout.Sider
					width="50%"
					style={styles.siderLayout}
				>
					<List
						header={"2개의 댓글이 있습니다."}
						itemLayout="horizontal"
						dataSource={comments}
						renderItem={(item) => (
							<Comment
								avatar={<Avatar icon={<UserOutlined />} />}
								author={item.author}
								content={item.content}
								datetime={item.datetime}
							/>
						)}
					/>
				</Layout.Sider>
			</Layout>
		</Layout>
	);
}

export default TouristSpotInfo;

const styles = {
	infoLayout: {
		height: '100%',
		margin: 0,
		padding: 0
	},
	mainLayout: {
		height: '100%',
		marginTop: '12px'
	},
	contentLayout: {
		height: '100%'
	},
	siderLayout: {
		height: '100%',
		backgroundColor: '#fff',
	}
}