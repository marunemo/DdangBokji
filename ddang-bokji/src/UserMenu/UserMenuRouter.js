import React, { useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Space, Menu, Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import Setting from './Setting';
import PointShop from './PointShop';

function UserMenuRouter(props) {
	const location = useLocation();
	const navigate = useNavigate();
	const backToHome = useCallback(() => navigate('/'), [navigate]);
	const linkToSelect = useCallback(({ key }) => {
		if(key === 'Setting')
			navigate('/UserMenu/')
		else if(key === 'PointShop')
			navigate('/UserMenu/PointShop')
	}, [navigate]);
	const currentSelect = useCallback((path) => {
		if(path === '/UserMenu/')
			return 'Setting';
		if(path === '/UserMenu/PointShop')
			return 'PointShop';
		return undefined;
	}, []);
	
	const sideMenu = [
		{
			key: 'Setting',
			icon: null,
			label: '내 설정',
		},
		{
			key: 'PointShop',
			icon: null,
			label: '포인트샵',
		},
	];
	
	if(!props.currentUser) {
		return (
			<Layout style={styles.authBlock}>
				<Space
					style={styles.authBlockLayout}
					direction="vertical"
					align="center"
				>
					로그인 후 이용 가능한 페이지입니다.
					<Button
						type="primary"
						size="large"
						onClick={backToHome}
					>
						돌아가기
					</Button>
				</Space>
			</Layout>
		)
	}
	
	return (
		<Layout style={styles.studyLayout}>
			<Layout.Sider style={styles.sider}>
				<Layout.Header style={styles.headerLayout}>
					<Button
						type="ghost"
						shape="circle"
						size="large"
						icon={<RollbackOutlined />}
						onClick={backToHome}
					/>
				</Layout.Header>
				<Menu
					style={styles.sideMenu}
					mode="inline"
					defaultSelectedKeys={currentSelect(location.pathname)}
					items={sideMenu}
					onSelect={linkToSelect}
				/>
			</Layout.Sider>
			<Layout.Content style={styles.content}>
				<Routes>
					<Route
						path="/"
						element={<Setting user={props.currentUser} logOut={props.logOut} />}
					/>
					<Route
						path="/PointShop"
						element={<PointShop user={props.currentUser} />}
					/>
				</Routes>
			</Layout.Content>
		</Layout>
	);
}

export default UserMenuRouter;

const styles = {
	studyLayout: {
		minHeight: '100%',
		padding: 0,
		margin: 0,
	},
	headerLayout: {
		backgroundColor: '#fff',
		padding: '0px 25px'
	},
	sider: {
		height: 'cakc(100vh - 64px)',
		background: '#fff',
	},
	sideMenu: {
		borderRight: 0,
		fontSize: '12pt'
	},
	content: {
		backgroundColor: '#e3e3e3',
		padding: '16px',
		margin: 0,
	},
	authBlock: {
		height: '100%',
		padding: 0,
		margin: 0,
		textAlign: 'center',
		justifyContent: 'center',
	},
	authBlockLayout: {
		fontSize: '24pt',
		fontWeight: 'bold'
	}
}