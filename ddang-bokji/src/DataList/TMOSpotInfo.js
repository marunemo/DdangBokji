import React, { useState, useEffect, useCallback } from 'react';
import {
	Layout,
	Image,
	Typography,
	List,
	Comment,
	Avatar,
	Button,
	Input,
	Space,
	Divider,
	Card,
	Rate
} from 'antd';
import {
	UserOutlined,
	LeftOutlined,
	RightOutlined,
	PhoneFilled,
	EnvironmentFilled,
	StarFilled
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from "firebase/firestore";
import axios from 'axios';
import { firestore } from '../Utility/Firebase';
import LoadingSpin from '../Utility/LoadingSpin';
import KakaoMap, { kakaoMapURL } from '../Utility/KakaoMap';
import emptyImg from '../Assets/no-pictures.png';

function TMOSpotInfo(props) {
	const { currentUser } = props;
	const { id } = useParams();
	const navigate = useNavigate();
	const [spotInfo, setSpotInfo] = useState(null);
	const [spotComments, setSpotComments] = useState(null);
	const [currentComment, setCurrentComment] = useState('');
	const [currentRate, setCurrentRate] = useState(3);
	const [mapURL, setMapURL] = useState(null)
	const [isBroken, setBroken] = useState(false);
	const [isCollapsed, setCollpased] = useState(true);
	const backToHome = useCallback(() => navigate('/'), [navigate]);
	const sendComment = useCallback((content, rating, currentUser, spotInfo, spotComments) => {
		const newComment = {
			uid: currentUser.uid,
			author: currentUser.displayName,
			avatar: currentUser.photoURL,
			content: content,
			rating: rating,
			datetime: new Date()
		}
		setDoc(doc(firestore, "comments", (spotInfo.tmo_nm + "TMO")), {
			commentsList: spotComments ? [...spotComments, newComment] : [newComment]
		})
			.then(() => setCurrentComment(''))
			.then(() => {
				getDoc(doc(firestore, "comments", (spotInfo.tmo_nm + "TMO"))).then((doc) => {
					const commentsList = doc.data().commentsList;
					commentsList.sort(function(a, b) {
						if(a.datetime.seconds > b.datetime.seconds) return -1;
						else if(a.datetime.seconds < b.datetime.seconds) return 1;
						else return 0;
					});
					setSpotComments(commentsList);
				});
			});
	}, []);
	
	try {
		useEffect(() => {
			if(!spotInfo) {
				axios.get(`/${process.env.REACT_APP_MND_TOKEN}/json/DS_TB_MND_TMO_INFO/${id}/${id}/`)
					.then((fetchData) => {
						setSpotInfo(fetchData.data.DS_TB_MND_TMO_INFO.row[0]);
						kakaoMapURL(fetchData.data.DS_TB_MND_TMO_INFO.row[0].tmo_nm + "역", setMapURL)
					});
			}
			
			if(!spotComments && spotInfo) {
				getDoc(doc(firestore, "comments", (spotInfo.tmo_nm + "TMO"))).then((doc) => {
					if(doc.data() !== undefined) {
						const commentsList = doc.data().commentsList;
						commentsList.sort(function(a, b) {
							if(a.datetime.seconds > b.datetime.seconds) return -1;
							else if(a.datetime.seconds < b.datetime.seconds) return 1;
							else return 0;
						});
						setSpotComments(commentsList)
					}
				});
			}
		}, [id, spotInfo, spotComments]);
	}
	catch(e) {
		console.log(e);
	}
	
	if(spotInfo === null)
		return (
			<Space
				style={{
					width: '100vw',
					height: '100vh',
					justifyContent: 'center'
				}}
				align="center"
			>
				<LoadingSpin />
			</Space>
		);
	
	return (
		<Layout style={styles.infoLayout}>
			<Layout.Content style={styles.contentLayout(isBroken)}>
				<Layout.Header style={styles.headerLayout}>
					<Button
						style={styles.goBackButton}
						shape="circle"
						size="large"
						icon={<LeftOutlined />}
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
				<div style={{ padding: '10px 25px 25px' }}>
					<Typography>
						<Typography.Title
							style={{ ...styles.inlineDisplay, margin: '0px 10px'}}
						>
							{spotInfo.tmo_nm + "TMO"}
						</Typography.Title>
						<Typography.Title
							style={styles.inlineDisplay}
							level={3}
						>
							{spotInfo.tmo_nm}
						</Typography.Title>
						<Divider />
						<div style={{...styles.infoText, marginTop: '15px'}}>
							<EnvironmentFilled />
							<Typography.Text> {spotInfo.pstnexpln}</Typography.Text>
						</div>
						<div style={styles.infoText}>
							<PhoneFilled />
							<Typography.Text> {spotInfo.gnrltelno}</Typography.Text>
						</div>
						<div style={styles.infoText}>
							<PhoneFilled />
							<Typography.Text> {spotInfo.wkday_strtm + " ~ " + spotInfo.wkday_endtm}</Typography.Text>
						</div>
						<div style={styles.infoText}>
							<PhoneFilled />
							<Typography.Text> {spotInfo.wkend_strtm + " ~ " + spotInfo.wkend_endtm}</Typography.Text>
						</div>
						<div style={styles.infoText}>
							<PhoneFilled />
							<Typography.Text> {spotInfo.etc}</Typography.Text>
						</div>
						<Divider />
						<Typography.Text
							style={{
								fontSize: '15pt',
								marginLeft: '10pt',
							}}
						>
							찾아가는 길
						</Typography.Text>
					</Typography>
					<KakaoMap
						style={styles.spotMap}
						name={spotInfo.tmo_nm + "역"}
						address={spotInfo.pstnexpln}
					/>
					<Button
						style={{ width: '100%' }}
						href={mapURL}
					>
						카카오맵으로 열기
					</Button>
				</div>
			</Layout.Content>
			<Layout.Sider
				width={isBroken ? '80%' : '50%'}
				style={styles.commentListLayout}
				collapsedWidth={25}
				breakpoint="md"
				collapsed={isCollapsed && isBroken}
				onBreakpoint={setBroken}
			>
				{
					currentUser
					? (
						<div>
							{
								isBroken &&
								<Button
									type="primary"
									style={styles.commentShowingButton}
									icon={isCollapsed ? <LeftOutlined /> : <RightOutlined />}
									onClick={() => setCollpased(collapsed => !collapsed)}
								/>
							}
							{
								(!isCollapsed || !isBroken) &&
								<div style={styles.commentLayout}>
									<Card style={styles.commentEditCard}>
										<p
											style={{
												fontSize: '22pt',
												fontWeight: 'bold'
											}}
										>
											해당 시설에 대한 평가를 남겨주세요!
										</p>
										<Rate
											style={{
												display: 'block',
												fontSize: '22pt'
											}}
											value={currentRate}
											onChange={setCurrentRate}
											character={<StarFilled />}
										/>
										<Comment
											avatar={<Avatar src={currentUser.photoURL} />}
											content={
												<Input.TextArea
													style={styles.commentEditor}
													placeholder="댓글을 입력해주세요."
													autoSize={true}
													allowClear={true}
													value={currentComment}
													onChange={(event) => setCurrentComment(event.target.value, currentUser, spotInfo, spotComments)}
												/>
											}
										/>
										<div style={styles.submitButtonLayout}>
											<Button
												type="primary"
												onClick={() => sendComment(currentComment, currentRate, currentUser, spotInfo, spotComments)}
											>
												등록
											</Button>
										</div>
									</Card>
									{
										!spotComments
										? (
											<Space
												style={styles.commentListSpace}
												align="center"
											>
												댓글이 없습니다. 새 댓글을 작성해주세요.
											</Space>
										)
										: (
											<List
												header={spotComments.length.toString() + "개의 댓글이 있습니다."}
												itemLayout="horizontal"
												dataSource={spotComments}
												renderItem={(item) => (
													<Comment
														avatar={<Avatar src={item.avatar} icon={<UserOutlined />} />}
														// set icon as fallback for image
														author={item.author}
														content={
															<div>
																<Rate
																	style={styles.ratingStyle}
																	value={item.rating}
																	disabled={true}
																	character={<StarFilled />}
																/>
																<p>{item.content.replace(/\\n/g, '<br />')}</p>
															</div>
														}
														datetime={new Date(item.datetime.seconds * 1000).toLocaleString()}
													/>
												)}
											/>
										)
									}
								</div>
							}
						</div>
					)
					: (
						<Space
							style={styles.commentListSpace}
							align="center"
						>
							{
								isBroken &&
								<Button
									type="primary"
									style={styles.commentShowingButton}
									icon={isCollapsed ? <LeftOutlined /> : <RightOutlined />}
									onClick={() => setCollpased(collapsed => !collapsed)}
								/>
							}
							{
								(!isCollapsed || !isBroken) &&
								<Space
									style={styles.authBlockLayout}
									direction="vertical"
									align="center"
								>
									로그인 후 이용 가능한 페이지입니다.
								</Space>
							}
						</Space>
					)
				}
			</Layout.Sider>
		</Layout>
	);
}

export default TMOSpotInfo;

const styles = {
	infoLayout: {
		height: '100%',
		margin: 0,
		padding: 0,
		background: '#fff'
	},
	headerLayout: {
		margin: 0,
		padding: '0px 30px',
		backgroundColor: '#fff',
	},
	goBackButton: {
		backgroundColor: 'transparent',
		border: '0px'
	},
	contentLayout: (isBroken) => ({
		overflow: 'initial',
		height: '100%',
		padding: 0,
		marginRight: isBroken ? '0%' : '50%'
	}),
	commentListLayout: {
		overflow: 'auto',
        position: 'fixed',
        right: 0,
        top: '64px',
        bottom: 0,
		zIndex: 1,
		backgroundColor: '#fff',
		borderLeft: '1px solid #000'
	},
	commentListSpace: {
		width: '100%',
		height: '100%',
		textAlign: 'center',
		justifyContent: 'center'
	},
	spotMap: {
		width: '100%',
		height: '25vh',
		marginTop: '8px'
	},
	commentEditor: {
		width: '100%',
	},
	authBlockLayout: {
		height: '100%',
		padding: 0,
		margin: 0,
		textAlign: 'center',
		justifyContent: 'center',
		fontSize: '24pt',
		fontWeight: 'bold'
	},
	commentShowingButton: {
		overflow: 'auto',
		position: 'fixed',
		height: '100vh',
		zIndex: 2,
		backgroundColor: '#000',
		borderColor: '#000',
		borderRadius: 0
	},
	commentLayout: {
		marginLeft: '25pt',
		padding: '5pt 10pt'
	},
	inlineDisplay: {
		display: 'inline'
	},
	infoText: {
		marginBottom: '12px',
		fontSize: '12pt'
	},
	commentEditCard: {
		width: '100%',
		marginBottom: '10px',
		borderRadius: '25px',
		boxShadow: '0px 5px 6px 1px rgba(0, 0, 0, 0.2)',
		textAlign: 'center',
		justifyContent: 'center'
	},
	submitButtonLayout: {
		textAlign: 'end'
	},
	ratingStyle: {
		display: 'block',
		fontSize: '18pt'
	}
}