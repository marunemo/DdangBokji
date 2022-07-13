import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, Menu, Row, Col, Button } from 'antd';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, set, ref, get, child } from "firebase/database";
import HomeContainer from './Home';
import TouristSpotInfo from '../DataList/TouristSpotInfo';
import StudyRouter from '../MilStudy/StudyRouter';
import auth, { signInGoogle } from '../Utility/Firebase';

function MainRouter() {
	const [currentUser, setCurrentUser] = useState(null);
	const database = getDatabase();
	
	const logOut = useCallback(() => {
		signOut(auth).then(() => setCurrentUser(null)).catch(error => console.log(error))
	}, []);
	
	const todayDateFormat = (today) => {
		return today.getFullYear().toString() + '/' + (today.getMonth() + 1).toString() + '/' + today.getDate().toString();
	};
	
	const saveUserStatus = useCallback((user) => {
		let totalProblem = [...Array(700).keys()];	
		totalProblem.sort(() => Math.random() - 0.5);
		let problemQuestionList = [];
		let problemAnswerList = [];
		for(var i = 0; i < 10; i++) {
			problemAnswerList.push(totalProblem[i * 4]);
			let problemQuestion = totalProblem.slice(i * 4, i * 4 + 4);
			problemQuestion.sort(() => Math.random() - 0.5);
			problemQuestionList.push(problemQuestion);
		}
		
		set(ref(database, 'users/' + user.uid), {
			accessDate: todayDateFormat(new Date()),
			dailyTermIndex: Math.floor(Math.random() * 700),
			problemQuestionList,
			problemAnswerList,
			examSubmmitted: false
		});
	}, [database]);
	
	const getLastUserAccessDate = useCallback((user) => {
		return get(child(ref(database), 'users/' + user.uid)).then((snapshot) => {
			if(!snapshot.exists())
				return null;
			
			return snapshot.val().accessDate;
		})
		.catch(error => console.log(error));
	}, [database]);
	
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if(user) {
				setCurrentUser(user);
				getLastUserAccessDate(user).then((accessDate) => {
					const today = todayDateFormat(new Date());
					if(accessDate !== today) {
						saveUserStatus(user);
					}
				});
			}
		})
	}, [saveUserStatus, getLastUserAccessDate]);
	
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
				<Layout.Header style={styles.mainHeaderLayout}>
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
				<Layout style={styles.mainContentLayout}>
					<Routes>
						<Route
							path="/"
							element={<HomeContainer />}
						/>
						<Route
							path="/TouristSpot/:id"
							element={<TouristSpotInfo currentUser={currentUser} />}
						/>
						<Route
							path="/MilStudy/*"
							element={<StudyRouter currentUser={currentUser} />}
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
	mainHeaderLayout: {
		width: '100%',
		position: 'fixed',
		zIndex: 2,
	},
	mainContentLayout: {
		minHeight: 'calc(100vh - 64px)',
		marginTop: '64px'
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