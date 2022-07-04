import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import MilWord from './MilWord';

function StudyRouter() {
	const sideMenu = ["Test"].map((option, key) => {
		return ({
			key: String(key),
			icon: null,
			label: option,
		});
	});
	
	return (
		<Layout style={styles.studyLayout}>
			<Layout.Sider style={styles.sider}>
				<Menu
					style={styles.sideMenu}
					mode="inline"
					items={sideMenu}
				/>
			</Layout.Sider>
			<Layout.Content style={styles.content}>
				<Routes>
					<Route
						path="/"
						element={<MilWord />}
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