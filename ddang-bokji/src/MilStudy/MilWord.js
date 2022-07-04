import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography } from 'antd';
import axios from 'axios';
import LoadingSpin from '../Utility/LoadingSpin';

function MilWord() {
	const [milTerms, setMilTerms] = useState([]);
	const [isLoaded, setLoading] = useState(false);
	
	const sideMenu = ["Test"].map((option, key) => {
		return ({
			key: String(key),
			icon: null,
			label: option,
		});
	});

	try {
		useEffect(() => {
			axios.get(`/${process.env.REACT_APP_MND_TOKEN}/json/DS_WARHSTR_MILAFRTERMNLG/1/700/`)
				.then((fetchData) => {
					const militaryTerms = fetchData.data.DS_WARHSTR_MILAFRTERMNLG.row.map((terms) => {
						return ({
							title: terms.title,
							desc: terms.ctnt,
							type: terms.actlthing_stdrd
						});
					});
					setMilTerms(militaryTerms);
					setLoading(true);
			});
		}, []);
	}
	catch(e) {
		console.log(e);
	}
	
	if(!isLoaded)
		return <LoadingSpin />;
	
	const randInt = Math.floor(Math.random() * 700);
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
						<Typography>
							<Typography.Title>{milTerms[randInt].title}</Typography.Title>
							<Typography.Title level={3}>{milTerms[randInt].type}</Typography.Title>
							<Typography.Paragraph>{milTerms[randInt].desc}</Typography.Paragraph>
						</Typography>
					</Layout.Content>
				</Layout>
			</Layout>
		</Layout>
	);
}

export default MilWord;

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