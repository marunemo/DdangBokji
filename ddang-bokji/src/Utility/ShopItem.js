import React from 'react';
import { Card, Image, Button } from 'antd';
import emptyImg from '../Assets/no-pictures.png';

function ItemCard(props) {
	const isActived = props.isActived;
	
	return (
		<Button
			style={styles.cardButton}
			disabled={!props.isActived}
			onClick={props.onClick}
		>
			<Card
				style={styles.cardLayout(isActived, props.isBroken)}
				cover={
					<Image
						style={styles.cardImage(isActived)}
						alt={props.imageDesc}
						src={props.photoImage}
						fallback={emptyImg}
						preview={false}
					/>
				}
				hoverable={isActived}
			>
				<Card.Meta
					style={{
						textAlign: 'center',
						justifyContent: 'center'
					}}
					title={
						<div
							style={{
								fontSize: '16pt',
								fontWeight: 'bold'
							}}>
						   {props.title}
						</div>
					}
					description={
						<div style={{ fontSize: '12pt' }}>
							{props.description}
							<div style={styles.priceLayout(isActived)}>{props.price}</div>
						</div>
					}
				/>
			</Card>
		</Button>
	);
}

export default ItemCard;


const styles = {
	cardLayout: (isActived, isBroken) => ({
		width: isBroken ? '40vw' : '100%',
		borderRadius: '30pt',
		backgroundColor: isActived ? '#fff' : '#ccc'
	}),
	cardImage: (isActived) => ({
		width: '100%',
		height: '100%',
		padding: '15px 15px 0px',
		objectFit: 'cover',
		filter: isActived ? 'none' : 'grayscale(100%)'
	}),
	priceLayout: (isActived) => ({
		textAlign: 'end',
		color: isActived ? '#f99' : '#333'
	}),
	cardButton: {
		width: 'auto',
		height: 'auto',
		padding: 0,
		border: 'transparent',
		borderRadius: '30pt',
		backgroundColor: 'transparent'
	}
}