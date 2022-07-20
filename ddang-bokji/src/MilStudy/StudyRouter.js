import React, { useMemo, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Space, Menu, Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import axios from 'axios';
import MilWord from './MilWord';
import MilExam from './MilExam';

function StudyRouter(props) {
	const location = useLocation();
	const navigate = useNavigate();
	const backToHome = useCallback(() => navigate('/'), [navigate]);
	const linkToSelect = useCallback(({ key }) => {
		if(key === 'MilWord')
			navigate('/MilStudy')
		else if(key === 'MilExam')
			navigate('/MilStudy/Exam')
	}, [navigate]);
	const currentSelect = useCallback((path) => {
		if(path === '/MilStudy')
			return 'MilWord';
		if(path === '/MilStudy/Exam')
			return 'MilExam';
		return undefined;
	}, []);
	
	const milTerms = useMemo(() => {
			return axios.get(`/${process.env.REACT_APP_MND_TOKEN}/json/DS_WARHSTR_MILAFRTERMNLG/1/700/`)
				.then((fetchData) => {
					return fetchData.data.DS_WARHSTR_MILAFRTERMNLG.row.map((terms) => {
						return ({
							title: terms.title,
							desc: terms.ctnt,
							type: terms.actlthing_stdrd
						});
					});
			});
		}, []);
	
	const sideMenu = [
		{
			key: 'MilWord',
			icon: null,
			label: '오늘의 단어',
		},
		{
			key: 'MilExam',
			icon: null,
			label: '단어 시험',
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
						element={<MilWord milTerms={milTerms} user={props.currentUser} />}
					/>
					<Route
						path="/Exam"
						element={<MilExam milTerms={milTerms} user={props.currentUser} />}
					/>
				</Routes>
			</Layout.Content>
		</Layout>
	);
}

export default StudyRouter;

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