import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, Menu, Row, Col, Button } from 'antd';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import HomeContainer from './Home';
import TouristSpotInfo from '../DataList/TouristSpotInfo';
import StudyRouter from '../MilStudy/StudyRouter';
import auth, { signInGoogle } from '../Utility/Firebase';

function MainRouter() {
	const [currentUser, setCurrentUser] = useState(null);
	const logOut = useCallback(() => {
		signOut(auth).then(() => setCurrentUser(null)).catch(error => console.log(error))
	}, []);
	
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if(user) {
				setCurrentUser(user);
				const database = getDatabase();
				set(ref(database, 'users/' + user.uid), {
					accessTime: new Date().toLocaleTimeString(),
				});
			}
		})
	}, []);
	
	const headerMenu = currentUser
		? [
			{
				key: 'userSetting',
				label: currentUser.displayName + '님 반갑습니다.'
			},
			{
				key: 'signOutButton',
				label: (
					<Button
						style={styles.signInButton}
						type="link"
						onClick={logOut}
					>
						로그아웃
					</Button>
				)
			}
		]
		: [
			{
				key: 'signInButton',
				label: (
					<Button
						style={styles.signInButton}
						type="link"
						onClick={signInGoogle}
					>
						로그인
					</Button>
				)
			}
		]
	
	
	return (
		<BrowserRouter>
			<Layout style={styles.mainLayout}>
				<Layout.Header className="header">
					<Row 
						style={styles.headerTypesetting}
						justify="space-between"
					>
						<Col>
							<p style={{ color: '#fff' }}>Logo</p>
						</Col>
						<Col>
							<Menu
								style={styles.userMenu(currentUser)}
								theme="dark"
								mode="horizontal"
								defaultSelectedKeys={undefined}
								items={headerMenu}
							/>
						</Col>
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
						<Route
							path="/MilStudy/*"
							element={<StudyRouter />}
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
	signInButton: {
		color: '#fff'
	},
	headerTypesetting: {
		width: '100%'
	},
	userMenu: (currentUser) => ({
		minWidth: currentUser ? '305px' : '115px'
	})
}