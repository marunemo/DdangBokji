import React from 'react';
import { Card, Image } from 'antd';
import emptyImg from '../Assets/no-pictures.png';

function ItemCard(props) {
	return (
		<Card
			style={styles.cardLayout}
			cover={
				<Image
					style={styles.cardImage}
					alt={props.imageDesc}
					src={props.photoImage}
					fallback={emptyImg}
					preview={false}
				/>
			}
			hoverable
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
					</div>
				}
			/>
		</Card>
	);
}

export default ItemCard;


const styles = {
	cardLayout: {
		width: '100%',
		borderRadius: '30pt',
	},
	cardImage: {
		width: '100%',
		height: '100%',
		padding: '12px 12px 0px',
		borderRadius: '30pt',
		objectFit: 'cover',
	}
}