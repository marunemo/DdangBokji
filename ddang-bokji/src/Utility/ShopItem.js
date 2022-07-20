import React from 'react';
import { Card, Image } from 'antd';
import emptyImg from '../Assets/no-pictures.png';

function ItemCard(props) {
	const isActived = props.isActived;
	
	return (
		<Card
			style={styles.cardLayout(isActived)}
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
						<div style={{ textAlign: 'end', color: '#f99' }}>{props.price}</div>
					</div>
				}
			/>
		</Card>
	);
}

export default ItemCard;


const styles = {
	cardLayout: (isActived) => ({
		width: '100%',
		borderRadius: '30pt',
		backgroundColor: isActived ? '#fff' : '#ccc'
	}),
	cardImage: (isActived) => ({
		width: '100%',
		height: '100%',
		padding: '15px 15px 0px',
		objectFit: 'cover',
		filter: isActived ? 'none' : 'grayscale(100%)'
	})
}