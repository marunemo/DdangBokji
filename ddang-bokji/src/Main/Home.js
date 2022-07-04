import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { BulbFilled } from '@ant-design/icons';
import TouristSpotList from '../DataList/TouristSpot';

function HomeContainer() {
	const sideMenu = ["Test"].map((option, key) => {
		return ({
			key: String(key),
			icon: null,
			label: option,
		});
	})
	
	return (
		<Layout style={styles.homeLayout}>
			<Layout style={styles.bodyLayout}>
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
				shape="circle"
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
	bodyLayout: {
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
		backgroundColor: '#1088e9',
		boxShadow: '3px 4px 5px rgba(0, 0, 0, 0.3)'
	},
	floatingIcon: {
		fontSize: '30px',
		color: '#fff'
	}
}