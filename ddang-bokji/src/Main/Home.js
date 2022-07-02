import React from 'react';
import { Breadcrumb, Layout, Menu, Row } from 'antd';
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
					<Breadcrumb style={styles.breadCrumb}>
						<Breadcrumb.Item>1</Breadcrumb.Item>
						<Breadcrumb.Item>2</Breadcrumb.Item>
						<Breadcrumb.Item>3</Breadcrumb.Item>
					</Breadcrumb>
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
		width: 200
	},
	sideMenu: {
		height: '100%',
		borderRight: 0
	},
	contentLayout: {
		padding: '0 24px 24px',
		margin: '0',
	},
	breadCrumb: {
		margin: '16px 0'
	},
	content: {
		background: '#fff',
		padding: 16,
		margin: 0,
	}
}