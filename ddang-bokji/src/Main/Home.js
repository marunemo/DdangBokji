import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Drawer, Grid } from 'antd';
import { BulbFilled, MenuUnfoldOutlined } from '@ant-design/icons';
import TouristSpotList from '../DataList/TouristSpot';
import ResortSpotList from '../DataList/ResortSpot';
import DiscountSpotList from '../DataList/DiscountSpot';
import TMOSpotList from '../DataList/TMOSpot';

function HomeContainer() {
	const [selectedSpot, selectSpotMenu] = useState('tourist');
	const [drawerVisible, setDrawerVisible] = useState(false);
	const screenWidth = Grid.useBreakpoint();
	const navigate = useNavigate();
	const gotoMilStudy = useCallback(() => {
		navigate('/MilStudy')
	}, [navigate]);
	
	const sideMenu = [
		{
			key: 'tourist',
			label: '군 복지시설 관광지'
		},
		{
			key: 'resort',
			label: '군 운영 휴양시설'
		},
		{
			key: 'discount',
			label: '병사 할인 혜택시설'
		},
		{
			key: 'tmo',
			label: 'TMO(여행장병 안내소)'
		}
	]
	
	return (
		<Layout style={styles.homeLayout}>
			<Layout style={styles.bodyLayout}>
				{
					screenWidth.md ?
					(
						<Layout.Sider
							style={styles.sider}
							width="225px"
						>
							<Menu
								style={styles.sideMenu}
								mode="inline"
								defaultSelectedKeys="tourist"
								items={sideMenu}
								onSelect={({ key }) => selectSpotMenu(key)}
							/>
						</Layout.Sider>
					) :
					(
						<Layout.Header style={{ backgroundColor: '#e3e3e3' }}>
							<Drawer
								visible={drawerVisible}
								onClose={() => setDrawerVisible(false)}
								placement="left"
							>
								<Menu
									mode="inline"
									defaultSelectedKeys="tourist"
									items={sideMenu}
									onSelect={({ key }) => selectSpotMenu(key)}
								/>
							</Drawer>
							<Button
								type="ghost"
								shape="circle"
								size="large"
								onClick={() => setDrawerVisible(true)}
								icon={<MenuUnfoldOutlined />}
							/>
						</Layout.Header>
					)
				}
				<Layout style={styles.contentLayout}>
					<Layout.Content style={styles.content}>
						{ selectedSpot === 'tourist' && <TouristSpotList isBroken={!screenWidth.md} /> }
						{ selectedSpot === 'resort' && <ResortSpotList isBroken={!screenWidth.md} /> }
						{ selectedSpot === 'discount' && <DiscountSpotList isBroken={!screenWidth.md} /> }
						{ selectedSpot === 'tmo' && <TMOSpotList isBroken={!screenWidth.md} /> }
					</Layout.Content>
				</Layout>
			</Layout>
			<Button
				style={styles.floatingButton}
				shape="circle"
				icon={<BulbFilled style={styles.floatingIcon} />}
				onClick={gotoMilStudy}
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
		backgroundColor: '#e3e3e3',
	},
	sideMenu: {
		position: 'fixed',
		top: '80px',
		left: '25px',
		width: '200px',
		minHeight: 'calc(100vh - 64px - 30px)',
		padding: '30px 0px',
		borderRight: 0,
		borderRadius: '30px',
		fontSize: '12pt',
		boxShadow: '3px 4px 6px rgba(0, 0, 0, 0.1)'
	},
	contentLayout: {
		minHeight: '100%',
		backgroundColor: '#e3e3e3',
		padding: '24px',
		margin: '0',
	},
	content: {
		backgroundColor: '#e3e3e3',
		padding: 0,
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