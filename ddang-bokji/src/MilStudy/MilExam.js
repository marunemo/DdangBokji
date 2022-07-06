import React, { useState, useEffect } from 'react';
import { Layout, Typography, Radio, Space, Steps, Button } from 'antd';
import LoadingSpin from '../Utility/LoadingSpin';

function MilExam(props) {
	const [testMilTerms, setTestMilTerms] = useState(null);
	const [currentAnswer, setCurrentAnswer] = useState(-1);
	const [currentPhase, setPhase] = useState(0);
	const [problemAnswers, setAnswers] = useState([]);
	const { milTerms } = props;
	let totalIndex = [...Array(700).keys()]
	totalIndex.sort(() => Math.random() - 0.5);
	const problemIndex = totalIndex.slice(0, 4 * 10);
	const testProblem = problemIndex[0];
	problemIndex.sort(() => Math.random() - 0.5);

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
	
	return (
		<Layout style={styles.bodyLayout}>
			<Steps current={currentPhase}>
				{
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((problemPhase) => {
						return (
							<Steps.Step key={"problem" + problemPhase} />
						);
					})
				}
			</Steps>
			<Typography>
				<Typography.Paragraph>{testMilTerms[testProblem].desc}</Typography.Paragraph>
				<Radio.Group onChange={(event) => setCurrentAnswer(event.target.value)}>
					<Space direction="vertical">
						{
							[0, 1, 2, 3].map((answer) => {
								return (
									<Radio key={'answer' + answer} value={answer} checked={false}>
										{testMilTerms[problemIndex[answer]].title}
									</Radio>
								);
							})
						}
					</Space>
				</Radio.Group>
			</Typography>
			{
				(currentPhase === 9)
				? (
					<Button
						type="primary"
						onClick={() => {
							setAnswers((answers) => [...answers, currentAnswer]);
							setCurrentAnswer(0);
							console.log(problemAnswers)
						}}
					>
						제출
					</Button>
				)
				: (
					<Button
						type="primary"
						onClick={() => {
							setAnswers((answers) => [...answers, currentAnswer]);
							setCurrentAnswer(-1);
							setPhase((curr) => (curr + 1))
						}}
					>
						다음 문제
					</Button>
				)
			}
			{
				(currentPhase !== 0) &&
				(
					<Button
						type="primary"
						onClick={() => {
							setAnswers((answers) => answers.slice(0, currentPhase - 1));
							setCurrentAnswer(-1);
							setPhase((curr) => (curr - 1))
						}}
					>
						이전 문제
					</Button>
				)
			}
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