import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Typography } from 'antd';
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
			
			return;
		})
		.catch(error => console.log(error));
	}, [user]);

	try {
		useEffect(() => {
			if(user) {
				
				milTerms.then((milTerm) => {
					setTodayMilTerm(milTerm[randInt]);
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
			<Typography>
				<Typography.Title>{todayMilTerm.title}</Typography.Title>
				<Typography.Title level={3}>{todayMilTerm.type}</Typography.Title>
				<Typography.Paragraph>{todayMilTerm.desc}</Typography.Paragraph>
			</Typography>
		</Layout>
	);
}

export default MilWord;

const styles = {
	bodyLayout: {
		minHeight: '100%',
		padding: 0,
		margin: 0,
	}
}