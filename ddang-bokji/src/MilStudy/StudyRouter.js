import React, { useMemo, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import axios from 'axios';
import MilWord from './MilWord';
import MilExam from './MilExam';

function StudyRouter(props) {
	const navigate = useNavigate();
	const backToHome = useCallback(() => navigate('/'), [navigate]);
	const linkToSelect = useCallback(({ key }) => {
		if(key === 'MilWord')
			navigate('/MilStudy')
		else if(key === 'MilExam')
			navigate('/MilStudy/Exam')
	}, [navigate]);
	
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