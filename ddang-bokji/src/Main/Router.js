import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, Menu, Row } from 'antd';
import HomeContainer from './Home';
import TouristSpotInfo from '../DataList/TouristSpotInfo';

function MainRouter() {
	const headerMenu = ["Home"].map((option, key) => {
		return ({
			key: String(key),
			label: option
		});
	})
	
	
	return (
		<BrowserRouter>
			<Layout style={styles.mainLayout}>
				<Layout.Header className="header">
					<Row justify="end">
						<Menu
							theme="dark"
							mode="horizontal"
							items={headerMenu}
						/>
					</Row>
				</Layout.Header>
				<Layout>
					<Routes>
						<Route
							path="/"
							element={<HomeContainer />}
						/>
						<Route
							path="/TouristSpot/:id"
							element={<TouristSpotInfo />}
						/>
					</Routes>
				</Layout>
			</Layout>
		</BrowserRouter>
	);
}

export default MainRouter;

const styles = {
	mainLayout: {
		minHeight: '100%',
		padding: 0,
		margin: 0,
	},
}