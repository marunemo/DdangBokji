import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Image, Typography, List, Comment, Avatar, Button, Input } from 'antd';
import { UserOutlined, RollbackOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from "firebase/firestore";
import axios from 'axios';
import { firestore } from '../Utility/Firebase';
import LoadingSpin from '../Utility/LoadingSpin';
import KakaoMap from '../Utility/KakaoMap';
import emptyImg from '../Assets/no-pictures.png';

function TouristSpotInfo(props) {
	const { currentUser } = props;
	const { id } = useParams();
	const navigate = useNavigate();
	const [spotInfo, setSpotInfo] = useState(null);
	const [spotComments, setSpotComments] = useState(null);
	const [currentComment, setCurrentComment] = useState('');
	const backToHome = useCallback(() => navigate('/'), [navigate]);
	const sendComment = useCallback((content, currentUser, spotInfo, spotComments) => {
		const newComment = {
			uid: currentUser.uid,
			author: currentUser.displayName,
			avatar: currentUser.photoURL,
			content: content,
			datetime: new Date()
		}
		setDoc(doc(firestore, "comments", spotInfo.rel_instltnnm), {
			commentsList: [...spotComments, newComment]
		}).then(() => setCurrentComment(''));
	}, []);
	
	try {
		useEffect(() => {
			if(!spotInfo) {
				axios.get(`/${process.env.REACT_APP_MND_TOKEN}/json/DS_MND_GUN_WLFRINSTLTN_SRNDT/${id}/${id}/`)
					.then((fetchData) => {
						setSpotInfo(fetchData.data.DS_MND_GUN_WLFRINSTLTN_SRNDT.row[0]);
					});
			}
			
			if(!spotComments && spotInfo) {
				getDoc(doc(firestore, "comments", spotInfo.rel_instltnnm)).then((doc) => {
					setSpotComments(doc.data().commentsList);
				});
			}
		}, [id, spotInfo, spotComments]);
	}
	catch(e) {
		console.log(e);
	}
	
	if(spotInfo === null || spotComments === null)
		return <LoadingSpin />;
	
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
							onClick={backToHome}
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
					style={styles.commentListLayout}
				>
					<Comment
						avatar={<Avatar src={currentUser.photoURL} />}
						content={
							<Input.Group compact>
								<Input.TextArea
									style={styles.commentEditor}
									placeholder="댓글을 입력해주세요."
									autoSize={true}
									allowClear={true}
									value={currentComment}
									onChange={(event) => setCurrentComment(event.target.value, currentUser, spotInfo, spotComments)}
								/>
								<Button
									type="primary"
									onClick={() => sendComment(currentComment, currentUser, spotInfo, spotComments)}
								>
									등록
								</Button>
							</Input.Group>
						}
					/>
					<List
						header={spotComments.length.toString() + "개의 댓글이 있습니다."}
						itemLayout="horizontal"
						dataSource={spotComments}
						renderItem={(item) => (
							<Comment
								avatar={<Avatar src={item.avatar} icon={<UserOutlined />} />}
								// set icon as fallback for image
								author={item.author}
								content={item.content}
								datetime={new Date(item.datetime.seconds * 1000).toLocaleString()}
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
	mainLayout: {
		height: '100%',
		marginTop: '12px',
		backgroundColor: '#fff'
	},
	headerLayout: {
		backgroundColor: '#fff',
	},
	contentLayout: {
		height: '100%',
		padding: '25px',
		marginRight: '50%'
	},
	commentListLayout: {
		overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        right: 0,
        top: '64px',
        bottom: 0,
		backgroundColor: '#fff',
	},
	spotMap: {
		width: '100%',
		height: '25vh'
	},
	commentEditor: {
		width: 'calc(100% - 60px)'
	}
}