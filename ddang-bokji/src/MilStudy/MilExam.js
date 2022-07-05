import React, { useState, useEffect } from 'react';
import { Layout, Typography, Radio, Space } from 'antd';
import LoadingSpin from '../Utility/LoadingSpin';

function MilExam(props) {
	const [testMilTerms, setTestMilTerms] = useState(null);
	const { milTerms } = props;

	try {
		useEffect(() => {
			milTerms.then((milTerm) => {
				setTestMilTerms(milTerm);
			})
		}, [milTerms]);
	}
	catch(e) {
		console.log(e);
	}
	
	if(testMilTerms === null)
		return <LoadingSpin />;
	
	let totalIndex = [...Array(700).keys()]
	totalIndex.sort(() => Math.random() - 0.5);
	const exampleIndex = totalIndex.slice(0, 4);
	const testProblem = exampleIndex[0];
	exampleIndex.sort(() => Math.random() - 0.5);
	return (
		<Layout style={styles.bodyLayout}>
			<Typography>
				<Typography.Paragraph>{testMilTerms[testProblem].desc}</Typography.Paragraph>
				<Radio.Group>
					<Space direction="vertical">
						{
							[0, 1, 2, 3].map((answer) => {
								return (
									<Radio key={'answer' + answer} value={answer}>
										{testMilTerms[exampleIndex[answer]].title}
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