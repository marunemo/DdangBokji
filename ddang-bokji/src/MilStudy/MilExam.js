import React, { useState, useEffect } from 'react';
import { Layout, Typography, Radio, Space } from 'antd';
import axios from 'axios';
import LoadingSpin from '../Utility/LoadingSpin';

function MilExam() {
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
	
	let totalIndex = [...Array(700).keys()]
	totalIndex.sort(() => Math.random() - 0.5);
	const exampleIndex = totalIndex.slice(0, 4);
	const testProblem = exampleIndex[0];
	exampleIndex.sort(() => Math.random() - 0.5);
	return (
		<Layout style={styles.bodyLayout}>
			<Typography>
				<Typography.Paragraph>{milTerms[testProblem].desc}</Typography.Paragraph>
				<Radio.Group>
					<Space direction="vertical">
						{
							[0, 1, 2, 3].map((answer) => {
								return (
									<Radio value={answer}>
										{milTerms[exampleIndex[answer]].title}
									</Radio>
								);
							})
						}
					</Space>
				</Radio.Group>
			</Typography>
		</Layout>
	);
}

export default MilExam;

const styles = {
	bodyLayout: {
		minHeight: '100%',
		padding: 0,
		margin: 0,
	}
}