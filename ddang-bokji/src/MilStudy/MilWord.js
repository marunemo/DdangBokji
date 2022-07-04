import React, { useState, useEffect } from 'react';
import { Layout, Typography } from 'antd';
import axios from 'axios';
import LoadingSpin from '../Utility/LoadingSpin';

function MilWord() {
	const [milTerms, setMilTerms] = useState([]);
	const [isLoaded, setLoading] = useState(false);

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
		<Layout style={styles.bodyLayout}>
			<Typography>
				<Typography.Title>{milTerms[randInt].title}</Typography.Title>
				<Typography.Title level={3}>{milTerms[randInt].type}</Typography.Title>
				<Typography.Paragraph>{milTerms[randInt].desc}</Typography.Paragraph>
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