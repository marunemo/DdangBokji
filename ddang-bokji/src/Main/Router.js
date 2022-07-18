import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Menu, Grid, Row, Col, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, set, ref, get, child, update } from "firebase/database";
import HomeContainer from './Home';
import TouristSpotInfo from '../DataList/TouristSpotInfo';
import StudyRouter from '../MilStudy/StudyRouter';
import auth, { signInGoogle } from '../Utility/Firebase';
import logo from '../Assets/main-logo.png';

function HomeLogoButton() {
	const navigate = useNavigate();
	const backToHome = useCallback(() => navigate('/'), [navigate]);
	
	return (
		<Button
			style={styles.logoButton}
			onClick={backToHome}
		>
			<img
				style={{ height: '54px' }}
				src={logo}
				alt="logo"
			/>
		</Button>
	);
}

function MainRouter() {
	const [currentUser, setCurrentUser] = useState(null);
	const database = getDatabase();
	const screenWidth = Grid.useBreakpoint();
	
	const logOut = useCallback(() => {
		signOut(auth).then(() => setCurrentUser(null)).catch(error => console.log(error))
	}, []);
	
	const todayDateFormat = (today) => {
		return today.getFullYear().toString() + '/' + (today.getMonth() + 1).toString() + '/' + today.getDate().toString();
	};
	
	const saveUserStatus = useCallback((user, isNewUser) => {
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
		
		if(isNewUser) {
			set(ref(database, 'users/' + user.uid), {
				accessDate: todayDateFormat(new Date()),
				dailyTermIndex: Math.floor(Math.random() * 700),
				problemQuestionList,
				problemAnswerList,
				examSubmmitted: false,
				point: 0
			});
		}
		else {
			update(ref(database, 'users/' + user.uid), {
				accessDate: todayDateFormat(new Date()),
				dailyTermIndex: Math.floor(Math.random() * 700),
				problemQuestionList,
				problemAnswerList,
				examSubmmitted: false
			});
		}
	}, [database]);
	
	const getUserData = useCallback((user) => {
		return get(child(ref(database), 'users/' + user.uid)).then((snapshot) => {
			if(!snapshot.exists())
				return null;
			
			return snapshot.val();
		})
		.catch(error => console.log(error));
	}, [database]);
	
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			
			if(user) {
				getUserData(user).then((userData) => {
					if(userData === null) {
						saveUserStatus(user, true);
					}
					else {
						const today = todayDateFormat(new Date());
						if(userData.accessDate !== today) {
							saveUserStatus(user, false);
						}
					}
				});
			}
		})
	}, [saveUserStatus, getUserData]);
	
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
	
	const collapsedHeaderMenu = currentUser
		? [
			{
				key: 'EllipsisOutlined',
				label: <EllipsisOutlined />,
				chlidren: [
					{
						key: 'userSetting',
						label: currentUser.displayName + '님 반갑습니다.',
						type: 'group'
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
						),
						type: 'group'
					}
				]
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
							<HomeLogoButton />
						</Col>
						<Col>
							{
								screenWidth.md
								? (
									<Menu
										style={styles.userMenu(currentUser)}
										theme="dark"
										mode="horizontal"
										defaultSelectedKeys={undefined}
										items={headerMenu}
									/>
								)
								: (
									<Menu
										style={styles.collapsedUserMenu(currentUser)}
										theme="dark"
										mode="incline"
										triggerSubMenuAction="click"
										defaultSelectedKeys={undefined}
										items={collapsedHeaderMenu}
									/>
								)
							}
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
	}),
	collapsedUserMenu: (currentUser) => ({
		minWidth: currentUser ? '65px' : '115px'
	}),
	logoButton: {
		height: '64px',
		padding: '5px',
		backgroundColor: 'transparent',
		border: 'none'
	}
}