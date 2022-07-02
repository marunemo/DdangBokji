import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';

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
		<Layout>
			<Layout.Header className="header">
				<Menu
					theme="dark"
					mode="horizontal"
					items={headerMenu}
				/>
			</Layout.Header>
			<Layout>
				<Layout.Sider style={styles.sider}>
					<Menu
						mode="inline"
						style={styles.sideMenu}
						items={sideMenu}
					/>
				</Layout.Sider>
				<Layout style={{ padding: '0 24px 24px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>1</Breadcrumb.Item>
						<Breadcrumb.Item>2</Breadcrumb.Item>
						<Breadcrumb.Item>3</Breadcrumb.Item>
					</Breadcrumb>
					<Layout.Content style={styles.content}>
						Content
					</Layout.Content>
				</Layout>
			</Layout>
		</Layout>
	);
}

export default HomeContainer;

const styles = {
	sider: {
		background: '#fff',
		width: 200
	},
	sideMenu: {
		height: '100%',
		borderRight: 0
	},
	content: {
		background: '#fff',
		padding: 24,
		margin: 0,
		minHeight: 280,
	}
}