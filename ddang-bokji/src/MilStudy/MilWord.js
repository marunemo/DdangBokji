import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Typography, Space } from 'antd';
import { getDatabase, set, ref, get, child } from "firebase/database";
import LoadingSpin from '../Utility/LoadingSpin';

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
			if(user) {
				milTerms.then((milTerm) => {
					todayMilTermIndex.then((termIndex) => {
						setTodayMilTerm(milTerm[termIndex]);
					});
				});
			}
		}, [milTerms, user]);
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
				<Space
					style={styles.termDesc}
					align="center"
				>
					{todayMilTerm.desc}
				</Space>
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
	},
	rightAlign: {
		width: '100%'
	},
	milTerm: {
		width: 'calc(100% - 50px)',
		padding: '15px',
		margin: '15px 25px 5px',
		border: '1px solid #000',
		borderRadius: 25,
		fontSize: '36px',
		fontWeight: 'bold'
	},
	termType: {
		padding: '10px',
		marginRight: '45px',
		border: '1px solid #000',
		borderRadius: 25,
		fontSize: '24px',
		fontWeight: 'bold'
	},
	termDesc: {
		padding: '25px',
		margin: '5px 15px',
		border: '1px solid #000',
		borderRadius: 25,
		fontSize: '16px'
	}
}