import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Form, Radio, Space, Steps, Button, Divider } from 'antd';
import { getDatabase, ref, get, child, update } from "firebase/database";
import LoadingSpin from '../Utility/LoadingSpin';

function MilExam(props) {
	const [testMilTerms, setTestMilTerms] = useState(null);
	const [currentProblem, setCurrentProblem] = useState(null);
	const [currentAnswer, setCurrentAnswer] = useState(undefined);
	const [currentPhase, setPhase] = useState(0);
	const [userAnswers, setUserAnswers] = useState([]);
	const [examSubmmitted, setExamSubmitted] = useState(false);
	const [examResult, setExamResult] = useState(null);
	const { milTerms, user } = props;
	
	const problemList = useMemo(() => {
		if(!user)
			return null;
		
		return get(child(ref(getDatabase()), 'users/' + user.uid)).then((snapshot) => {
			if(!snapshot.exists())
				return null;
			
			return ({
				questionList: snapshot.val().problemQuestionList,
				answerList: snapshot.val().problemAnswerList,
			});
		})
		.catch(error => console.log(error));
	}, [user]);
	
	const submitResult = useCallback((userAnswers) => {
		problemList.then((problems) => {
			let currectAnswerCount = 0;
			for(const i in userAnswers) {
				if(problems.answerList[i] === problems.questionList[i][userAnswers[i]])
					currectAnswerCount += 1;
			}
			return currectAnswerCount;
		}).then((currentAnswerCount) => {
			update(ref(getDatabase(), 'users/' + user.uid), {
				userAnswers,
				examSubmmitted: true,
				point: currentAnswerCount
			})
		});
	}, [user, problemList]);

	try {
		useEffect(() => {
			if(!testMilTerms) {
				milTerms.then((milTerm) => {
					setTestMilTerms(milTerm);
				});
			}
			
			if(user) {
				problemList.then((problems) => {
					setCurrentProblem({
						answer: problems.answerList[currentPhase],
						questions: problems.questionList[currentPhase],
					})
				});
			}
			
			if(!examSubmmitted) {
				get(child(ref(getDatabase()), 'users/' + user.uid)).then((snapshot) => {
					if(!snapshot.exists())
						return null;

					setExamSubmitted(snapshot.val().examSubmmitted);
				});
			}
			else if(user && testMilTerms) {
				get(child(ref(getDatabase()), 'users/' + user.uid)).then((snapshot) => {
					if(!snapshot.exists())
						return null;
					
					setUserAnswers(snapshot.val().userAnswers);
					problemList.then((problems) => {
						const ResultComponents = snapshot.val().userAnswers.map((userAnswer, problemIndex) => {
							return(
								<Space
									key={'examResult' + problemIndex}
									style={{ marginBottom: '20pt' }}
									direction="vertical"
								>
									<Divider
										orientation="left"
										style={styles.problemPhase}
									>
										{'문제 ' + (problemIndex + 1)}
									</Divider>
									<Form.Item>
										<Space style={styles.problemQuestion}>
											{testMilTerms[problems.answerList[problemIndex]].desc}
										</Space>
									</Form.Item>
									<Form.Item>
										<Radio.Group
											style={styles.problemAnswers}
											size="large"
											value={userAnswer}
										>
											<Space direction="vertical">
												{
													[0, 1, 2, 3].map((answer) => {
														return (
															<Radio
																key={'answer' + problemIndex + '-' + answer}
																style={styles.problemAnswerResult(
																	answer === userAnswer,
																	problems.questionList[problemIndex][answer] === problems.answerList[problemIndex])
																}
																value={answer}
															>
																{testMilTerms[problems.questionList[problemIndex][answer]].title}
															</Radio>
														);
													})
												}
											</Space>
										</Radio.Group>
									</Form.Item>
								</Space>
							);
						});
						setExamResult(ResultComponents);
					});
				});
			}
		}, [milTerms, user, currentPhase, examSubmmitted, problemList, testMilTerms]);
	}
	catch(e) {
		console.log(e);
	}
	
	if(testMilTerms === null || currentProblem === null)
		return <LoadingSpin />;
	
	if(examResult !== null) {
		return (
			<Form
				layout="vertical"
				style={styles.bodyLayout}
			>
				{examResult}
			</Form>
		);
	}
	
	return (
		<Form
			layout="vertical"
			style={styles.bodyLayout}
		>
			<Form.Item>
				<Divider
					orientation="left"
					style={styles.problemPhase}
				>
					문제 단계
				</Divider>
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
			<Form.Item>
				<Space style={styles.problemQuestion}>
					{testMilTerms[currentProblem.answer].desc}
				</Space>
			</Form.Item>
			<Form.Item>
				<Radio.Group
					style={styles.problemAnswers}
					size="large"
					value={currentAnswer}
					onChange={(event) => setCurrentAnswer(event.target.value)}
				>
					<Space direction="vertical">
						{
							[0, 1, 2, 3].map((answer) => {
								return (
									<Radio key={'answer' + answer} value={answer}>
										{testMilTerms[currentProblem.questions[answer]].title}
									</Radio>
								);
							})
						}
					</Space>
				</Radio.Group>
			</Form.Item>
			<Form.Item>
				<Space style={styles.rightAlign} direction="vertical" align="end">
					<Space style={styles.submitButtonGroup}>
						{
							(currentPhase !== 0) &&
							(
								<Button
									type="dashed"
									onClick={() => {
										setPhase((curr) => {
											setUserAnswers((answers) => answers.slice(0, curr - 1));
											setCurrentAnswer(curr - 1);
											return (curr - 1);
										})
									}}
								>
									이전 문제
								</Button>
							)
						}
						{
							(currentPhase === 9)
							? (
								<Button
									type="primary"
									onClick={() => {
										submitResult([...userAnswers, currentAnswer]);
									}}
								>
									제출
								</Button>
							)
							: (
								<Button
									type="primary"
									onClick={() => {
										setUserAnswers((answers) => [...answers, currentAnswer]);
										setCurrentAnswer(undefined);
										setPhase((curr) => (curr + 1))
									}}
								>
									다음 문제
								</Button>
							)
						}
					</Space>
				</Space>
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
	},
	rightAlign: {
		width: '100%'
	},
	submitButtonGroup: {
		marginRight: '35px'
	},
	problemPhase: {
		fontSize: '15px',
		fontWeight: 'bold'
	},
	problemQuestion: {
		padding: '25px',
		margin: '5px 15px',
		border: '1px solid #000',
		borderRadius: 25,
		fontSize: '16px'
	},
	problemAnswers: {
		marginLeft: '25px',
	},
	problemAnswerResult: (isUserAnswer, isCurrectAnswer) => ({
		fontWeight: isUserAnswer ? 'bold' : 'normal',
		color: isCurrectAnswer ? ( isUserAnswer ? 'blue' : 'red' ) : 'black'
	})
}