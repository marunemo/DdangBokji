import React, { useState, useEffect } from 'react';
import { Form, Typography, Radio, Space, Steps, Button } from 'antd';
import LoadingSpin from '../Utility/LoadingSpin';

function MilExam(props) {
	const [testMilTerms, setTestMilTerms] = useState(null);
	const [currentAnswer, setCurrentAnswer] = useState(undefined);
	const [currentPhase, setPhase] = useState(0);
	const [problemAnswers, setAnswers] = useState([]);
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
	
	return (
		<Form
			layout="vertical"
			style={styles.bodyLayout}
		>
			<Form.Item label="문제 단계">
				<Steps current={currentPhase}>
					{
						[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((problemPhase) => {
							return (
								<Steps.Step key={"problem" + problemPhase} />
							);
						})
					}
				</Steps>
			</Form.Item>
			<Form.Item label="문제">
				<Typography>
					<Typography.Paragraph>{testMilTerms[testProblem].desc}</Typography.Paragraph>
				</Typography>
			</Form.Item>
			<Form.Item label="답">
				<Radio.Group
					value={currentAnswer}
					onChange={(event) => setCurrentAnswer(event.target.value)}
				>
					<Space direction="vertical">
						{
							[0, 1, 2, 3].map((answer) => {
								return (
									<Radio key={'answer' + answer} value={answer}>
										{testMilTerms[problemIndex[answer]].title}
									</Radio>
								);
							})
						}
					</Space>
				</Radio.Group>
			</Form.Item>
			<Form.Item>
				{
					(currentPhase === 9)
					? (
						<Button
							type="primary"
							onClick={() => {
								console.log([...problemAnswers, currentAnswer])
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
								setCurrentAnswer(undefined);
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
								setPhase((curr) => {
									setAnswers((answers) => answers.slice(0, curr - 1));
									setCurrentAnswer(curr - 1);
									return (curr - 1);
								})
							}}
						>
							이전 문제
						</Button>
					)
				}
			</Form.Item>
		</Form>
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