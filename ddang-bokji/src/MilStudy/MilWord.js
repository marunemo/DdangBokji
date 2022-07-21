import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Space, message } from 'antd';
import { getDatabase, ref, get, child, update } from "firebase/database";
import LoadingSpin from '../Utility/LoadingSpin';
import ddangLogo from '../Assets/ddang-logo.png';

function MilWord(props) {
	const [todayMilTerm, setTodayMilTerm] = useState(null);
	const { milTerms, user } = props;

	const todayMilTermIndex = useMemo(() => {
		if(!user)
			return null;
		
		return get(child(ref(getDatabase()), 'users/' + user.uid)).then((snapshot) => {
			if(!snapshot.exists())
				return null;
			
			return snapshot.val().dailyTermIndex;
		})
		.catch(error => console.log(error));
	}, [user]);

	try {
		useEffect(() => {
			if(todayMilTermIndex) {
				milTerms.then((milTerm) => {
					todayMilTermIndex.then((termIndex) => {
						setTodayMilTerm(milTerm[termIndex]);
					});
				})
				.then(() => {
					return get(child(ref(getDatabase()), 'users/' + user.uid)).then((snapshot) => {
						if(!snapshot.exists())
							return null;

						return snapshot.val().point;
					});
				})
				.then((ddangPoint) => {
					update(ref(getDatabase(), 'users/' + user.uid), {
						dailyChecked: true,
						point: ddangPoint + 5
					});
				})
				.then(() => {
					message.success({
						content: (
							<div>
								<div>오늘의 단어를 확인했습니다!</div>
								<div>
									<img style={{ width: '12pt', height: '12pt' }} src={ddangLogo} alt='땡'/>
									포인트
									<b>+5</b>
								</div>
							</div>
						),
						key: 'dailyWordChecked',
						duration: 7
					});
				});
			}
		}, [user, milTerms, todayMilTermIndex]);
	}
	catch(e) {
		console.log(e);
	}
	
	if(todayMilTerm === null)
		return <LoadingSpin />
	
	return (
		<Layout style={styles.bodyLayout}>
			<Space
				direction="vertical"
			>
				<Space
					style={styles.milTerm}
					align="center"
				>
					{todayMilTerm.title}
				</Space>
				<Space style={styles.rightAlign} direction="vertical" align="end">
					<Space
						style={styles.termType}
						align="center"
					>
						{todayMilTerm.type}
					</Space>
				</Space>
				<div style={styles.termDesc}>
					{
						todayMilTerm.desc.split('<br/>').map((text) => {
							if(text)
								return (<p style={{ textIndent: '10pt' }}>{text}<br /></p>);
							return <span />;
						})
					}
				</div>
			</Space>
		</Layout>
	);
}

export default MilWord;

const styles = {
	bodyLayout: {
		minHeight: '100%',
		padding: 0,
		margin: 0,
		backgroundColor: '#e3e3e3',
	},
	rightAlign: {
		width: '100%'
	},
	milTerm: {
		width: 'calc(100% - 50px)',
		padding: '15px',
		margin: '15px 25px 5px',
		backgroundColor: '#fff',
		borderRadius: 25,
		fontSize: '36px',
		fontWeight: 'bold',
		boxShadow: '3px 4px 6px rgba(0, 0, 0, 0.1)'
	},
	termType: {
		padding: '10px',
		marginRight: '45px',
		backgroundColor: '#fff',
		borderRadius: 25,
		fontSize: '24px',
		fontWeight: 'bold',
		boxShadow: '3px 4px 6px rgba(0, 0, 0, 0.1)'
	},
	termDesc: {
		padding: '25px',
		margin: '5px 15px',
		backgroundColor: '#fff',
		borderRadius: 25,
		fontSize: '16px',
		boxShadow: '3px 4px 6px rgba(0, 0, 0, 0.1)'
	}
}