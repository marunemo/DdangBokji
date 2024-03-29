import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Menu, Grid, Row, Col, Button, Space } from 'antd';
import { SettingFilled, LogoutOutlined } from '@ant-design/icons';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, set, ref, get, child, update } from "firebase/database";
import HomeContainer from './Home';
import TouristSpotInfo from '../DataList/TouristSpotInfo';
import ResortSpotInfo from '../DataList/ResortSpotInfo';
import DiscountSpotInfo from '../DataList/DiscountSpotInfo';
import TMOSpotInfo from '../DataList/TMOSpotInfo';
import StudyRouter from '../MilStudy/StudyRouter';
import UserMenuRouter from '../UserMenu/UserMenuRouter';
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

function UserMenuButton(props) {
	const navigate = useNavigate();
	const gotoUserMenu = useCallback(() => navigate('/UserMenu/'), [navigate]);
	
	return (
		<Button
			style={styles.signInButton}
			type="link"
			onClick={gotoUserMenu}
		>
			{props.userName + '님 반갑습니다.'}
		</Button>
	);
}


function CollapsedUserMenuButton() {
	const navigate = useNavigate();
	const gotoUserMenu = useCallback(() => navigate('/UserMenu/'), [navigate]);
	
	return (
		<Button
			style={styles.signInButton}
			type="link"
			onClick={gotoUserMenu}
			icon={<SettingFilled />}
		/>
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
				dailyChecked: false,
				problemQuestionList,
				problemAnswerList,
				examSubmmitted: false,
				point: 0,
				badge: 'none',
				badgeList: ['none']
			});
		}
		else {
			update(ref(database, 'users/' + user.uid), {
				accessDate: todayDateFormat(new Date()),
				dailyTermIndex: Math.floor(Math.random() * 700),
				dailyChecked: false,
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
				label: <UserMenuButton userName={currentUser.displayName} />
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
									currentUser ?
									(
										<Space style={styles.collapsedUserMenu(currentUser)}>
											<CollapsedUserMenuButton />
											<Button
												style={styles.signInButton}
												type="link"
												onClick={logOut}
												icon={<LogoutOutlined />}
											/>
										</Space>
									) :
									(
										<Space style={styles.collapsedUserMenu(currentUser)}>
											<Button
												style={styles.signInButton}
												type="link"
												onClick={signInGoogle}
											>
												로그인
											</Button>
										</Space>
									)
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
							path="/ResortSpot/:id"
							element={<ResortSpotInfo currentUser={currentUser} />}
						/>
						<Route
							path="/DiscountSpot/:id"
							element={<DiscountSpotInfo currentUser={currentUser} />}
						/>
						<Route
							path="/TMOSpot/:id"
							element={<TMOSpotInfo currentUser={currentUser} />}
						/>
						<Route
							path="/MilStudy/*"
							element={<StudyRouter currentUser={currentUser} />}
						/>
						<Route
							path="/UserMenu/*"
							element={<UserMenuRouter currentUser={currentUser} logOut={logOut} />}
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
		minWidth: currentUser ? '325px' : '115px'
	}),
	collapsedUserMenu: (currentUser) => ({
		minWidth: currentUser ? '70px' : '75px'
	}),
	logoButton: {
		height: '64px',
		padding: '5px',
		backgroundColor: 'transparent',
		border: 'none'
	}
}