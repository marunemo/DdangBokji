import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Layout, Divider, Button, Avatar, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getDatabase, ref, get, child, update } from "firebase/database";
import LoadingSpin from '../Utility/LoadingSpin';
import badgeMap from '../Utility/BadgeMap';
import ddangLogo from '../Assets/ddang-logo.png';

function PointShop(props) {
	const [userInfo, setUserInfo] = useState(null);
	const [userBadges, setUserBadges] = useState(null);
	const [currentUserBadge, setCurrentUserBadge] = useState(null);
	const { user, logOut } = props;

	const promiseUserInfo = useMemo(() => {
		if(!user)
			return null;
		
		return get(child(ref(getDatabase()), 'users/' + user.uid)).then((snapshot) => {
			if(!snapshot.exists())
				return null;
			
			return snapshot.val();
		})
		.catch(error => console.log(error));
	}, [user]);
	
	
	const saveUserSetting = useCallback((userBadge) => {
		update(ref(getDatabase(), 'users/' + user.uid), {
			badge: userBadge
		});
	}, [user]);

	try {
		useEffect(() => {
			if(promiseUserInfo) {
				promiseUserInfo.then((info) => {
					setUserInfo(info);
					setCurrentUserBadge(info.badge);
					
					const badges = info.badgeList.map((badge) => {
						return (
							<Select.Option key={badge} value={badge}>
								{
									(badge !== 'none') &&
									<img
										style={styles.badgeImage}
										src={badgeMap[badge].image}
										alt={badge}
									/>
								}
								<p style={styles.badgeFont}>{badgeMap[badge].title}</p>
							</Select.Option>
						);
					});
					setUserBadges(badges);
				});
			}
		}, [promiseUserInfo]);
	}
	catch(e) {
		console.log(e);
	}
	
	if(user === null || userInfo === null)
		return <LoadingSpin />

	return (
		<Layout style={styles.bodyLayout}>
			<div style={styles.userAuthLayout}>
				<Avatar
					size={100}
					src={user.photoURL}
					icon={<UserOutlined />}
				/>
				<p style={styles.userName}>{user.displayName}</p>
				<p style={styles.userEmail}>{user.email}</p>
				<Button
					size="large"
					onClick={logOut}
				>
					로그아웃
				</Button>
			</div>
			<Divider />
			<div style={styles.userInfoLayout}>
				<p style={styles.userPoint}>
					내 <img style={{ width: '18pt', height: '18pt' }} src={ddangLogo} alt="땡"/>포인트 : <b>{userInfo.point}</b>
				</p>
				<p style={styles.userBadge}>
					{'내 뱃지 : '}
				</p>
				<Select
					style={{ width: (props.isBroken) ? '240px' : '360px' }}
					value={currentUserBadge}
					onChange={setCurrentUserBadge}
				>
					{userBadges}
				</Select>
				<div style={styles.saveButtonLayout}>
					<Button
						size="large"
						onClick={() => saveUserSetting(currentUserBadge)}
					>
						<b>저장</b>
					</Button>
				</div>
			</div>
		</Layout>
	);
}

export default PointShop;

const styles = {
	bodyLayout: {
		background: 'transparent',
		margin: 0,
		padding: '12px'
	},
	userAuthLayout: {
		width: '100%',
		padding: '0 20px',
		textAlign: 'center',
		justifyContent: 'center'
	},
	userName: {
		margin: '25px 0 0',
		fontSize: '22pt',
		fontWeight: 'bold'
	},
	userEmail: {
		fontSize: '19pt'
	},
	userInfoLayout: {
		padding: '15px 30px'
	},
	userPoint: {
		fontSize: '16pt'
	},
	userBadge: {
		fontSize: '16pt',
		display: 'inline'
	},
	badgeImage: {
		width: '25pt',
		maxHeight: '15pt',
		display: 'inline',
		margin: '0 5pt 0 0',
	},
	badgeFont: {
		fontSize: '15pt',
		fontWeight: 'bold',
		display: 'inline'
	},
	saveButtonLayout: {
		textAlign: 'end'
	},
}