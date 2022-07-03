import React from 'react';
import { Layout, Menu, Row } from 'antd';
import TouristSpotList from '../DataList/TouristSpot';

function HomeContainer() {
	const headerMenu = ["Home"].map((option, key) => {
		return ({
			key: String(key),
			label: option
		});
	})
	
	const sideMenu = ["Test"].map((option, key) => {
		return ({
			key: String(key),
			icon: null,
			label: option,
		});
	})
	
	return (
		<Layout style={styles.homeLayout}>
			<Layout.Header className="header">
				<Row justify="end">
					<Menu
						theme="dark"
						mode="horizontal"
						items={headerMenu}
					/>
				</Row>
			</Layout.Header>
			<Layout style={{ minHeight: '360px' }}>
				<Layout.Sider style={styles.sider}>
					<Menu
						style={styles.sideMenu}
						mode="inline"
						items={sideMenu}
					/>
				</Layout.Sider>
				<Layout style={styles.contentLayout}>
					<Layout.Content style={styles.content}>
						<TouristSpotList />
					</Layout.Content>
				</Layout>
			</Layout>
		</Layout>
	);
}

export default HomeContainer;

const styles = {
	homeLayout: {
		padding: 0,
		margin: 0,
	},
	sider: {
		background: '#fff',
	},
	sideMenu: {
		height: '100%',
		borderRight: 0,
		fontSize: '12pt'
	},
	contentLayout: {
		background: '#e3e3e3',
		padding: '24px',
		margin: '0',
	},
	content: {
		background: '#e3e3e3',
		padding: '16px',
		margin: 0,
	}
}