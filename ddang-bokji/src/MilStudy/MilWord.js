import React, { useState, useEffect } from 'react';
import { Layout, Typography } from 'antd';
import LoadingSpin from '../Utility/LoadingSpin';

function MilWord(props) {
	const [todayMilTerm, setTodayMilTerm] = useState(null);
	const { milTerms } = props;
	const randInt = 1;

	try {
		useEffect(() => {
			milTerms.then((milTerm) => {
				setTodayMilTerm(milTerm[randInt]);
			})
		}, [milTerms, randInt]);
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