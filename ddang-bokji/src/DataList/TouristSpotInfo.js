import React, { useState, useEffect } from 'react';
import { Layout, Image, Typography, List, Comment, Avatar, Button } from 'antd';
import { UserOutlined, RollbackOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LoadingSpin from '../Utility/LoadingSpin';
import KakaoMap from '../Utility/KakaoMap';
import emptyImg from '../Assets/no-pictures.png';

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
			<Layout style={styles.mainLayout}>
				<Layout.Content style={styles.contentLayout}>
					<Layout.Header style={styles.headerLayout}>
						<Button
							type="ghost"
							shape="circle"
							size="large"
							icon={<RollbackOutlined />}
						/>
					</Layout.Header>
					<Image
						width="100%"
						height="100%"
						style={styles.sampleImage}
						alt={spotInfo.phototitle}
						src={spotInfo.image_file}
						fallback={emptyImg}
					/>
					<Typography>
						<Typography.Text>이름 : {spotInfo.rel_instltnnm}</Typography.Text><br />
						<Typography.Text>주소 : {spotInfo.instltnpstn}</Typography.Text><br />
						<Typography.Text>전화 : {spotInfo.cntadr}</Typography.Text><br />
					</Typography>
					<KakaoMap
						style={styles.spotMap}
						address={spotInfo.instltnpstn}
					/>
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
		padding: 0,
		background: '#fff'
	},
	headerLayout: {
		backgroundColor: '#fff',
	},
	mainLayout: {
		height: '100%',
		marginTop: '12px',
		backgroundColor: '#fff'
	},
	contentLayout: {
		height: '100%',
		padding: '25px'
	},
	siderLayout: {
		height: '100%',
		backgroundColor: '#fff',
	},
	spotMap: {
		width: '100%',
		height: '25vh'
	}
}