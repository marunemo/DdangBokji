import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Divider, Button, Avatar, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getDatabase, ref, get, child } from "firebase/database";
import LoadingSpin from '../Utility/LoadingSpin';

import img_private from '../Assets/private.png';
import img_private_first_class from '../Assets/private-first-class.png';
import img_corporal from '../Assets/corporal.png';
import img_sergeant from '../Assets/sergeant.png';

function PointShop(props) {
	const [userInfo, setUserInfo] = useState(null);
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

	try {
		useEffect(() => {
			if(promiseUserInfo) {
				promiseUserInfo.then(setUserInfo);
			}
		}, [promiseUserInfo]);
	}
	catch(e) {
		console.log(e);
	}
	
	if(user === null || userInfo === null)
		return <LoadingSpin />
console.log(user)
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
				<p style={styles.userPoint}>내 땡포인트 : <b>{userInfo.point}</b></p>
				<p style={styles.userBadge}>
					{'내 뱃지 : '}
					<Select
						style={{ width: '360px' }}
						defaultValue="none"
					>
						<Select.Option value="none">없음</Select.Option>
					</Select>
				</p>
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
		fontSize: '16pt'
	}
}