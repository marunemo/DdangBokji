import React from 'react';
import { Layout, Menu, Row, Button } from 'antd';
import { BulbFilled } from '@ant-design/icons';
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
			<Layout style={styles.mainLayout}>
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
			<Button
				style={styles.floatingButton}
				icon={<BulbFilled style={styles.floatingIcon} />}
			/>
		</Layout>
	);
}

export default HomeContainer;

const styles = {
	homeLayout: {
		minHeight: '100%',
		padding: 0,
		margin: 0,
	},
	mainLayout: {
		minHeight: '100%'
	},
	sider: {
		background: '#fff',
	},
	sideMenu: {
		minHeight: '100%',
		borderRight: 0,
		fontSize: '12pt'
	},
	contentLayout: {
		minHeight: '100%',
		background: '#e3e3e3',
		padding: '24px',
		margin: '0',
	},
	content: {
		background: '#e3e3e3',
		padding: '16px',
		margin: 0,
	},
	floatingButton: {
		position: 'fixed',
		bottom: '50px',
		right: '50px',
		height: '70px',
		width: '70px',
		borderRadius: '50%',
		backgroundColor: '#1088e9'
	},
	floatingIcon: {
		fontSize: '30px',
		color: '#fff'
	}
}