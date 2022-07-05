import React, { useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import MilWord from './MilWord';
import MilExam from './MilExam';

function StudyRouter() {
	const navigate = useNavigate();
	const linkToSelect = useCallback(({ key }) => {
		if(key === 'MilWord')
			navigate('/MilStudy')
		else if(key === 'MilExam')
			navigate('/MilStudy/Exam')
	}, [navigate]);
	
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
	
	
	
	return (
		<Layout style={styles.studyLayout}>
			<Layout.Sider style={styles.sider}>
				<Menu
					style={styles.sideMenu}
					mode="inline"
					items={sideMenu}
					onSelect={linkToSelect}
				/>
			</Layout.Sider>
			<Layout.Content style={styles.content}>
				<Routes>
					<Route
						path="/"
						element={<MilWord />}
					/>
					<Route
						path="/Exam"
						element={<MilExam />}
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
	sider: {
		background: '#fff',
	},
	sideMenu: {
		minHeight: '100%',
		borderRight: 0,
		fontSize: '12pt'
	},
	content: {
		background: '#e3e3e3',
		padding: '16px',
		margin: 0,
	},
}