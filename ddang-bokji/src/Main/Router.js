import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, Menu, Row, Button } from 'antd';
import { onAuthStateChanged, signOut } from "firebase/auth";
import HomeContainer from './Home';
import TouristSpotInfo from '../DataList/TouristSpotInfo';
import StudyRouter from '../MilStudy/StudyRouter';
import auth, { signInGoogle } from '../Utility/Firebase';

function MainRouter() {
	const [currentUser, setCurrentUser] = useState(null);
	const logOut = (() => {
		signOut(auth).then(() => setCurrentUser(null)).catch(error => console.log(error))
	})
	
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if(user) {
				setCurrentUser(user);
			}
		})
	}, []);
	
	const headerMenu = [
		{
			label: 
				currentUser
				? (
					<Button
						type="text"
						onClick={logOut}
					>
						로그아웃
					</Button>
				)
				: (
						<Button
							type="text"
							onClick={signInGoogle}
						>
							로그인
						</Button>
					)
		}
	];
	
	
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
}