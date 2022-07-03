import React from 'react';
import { Card } from 'antd';

function ItemCard(props) {
	return (
		<Card
			style={{
				width: '100%'
			}}
			cover={
				<img
					alt={props.imageDesc}
					src={props.photoImage}
				/>
			}
			hoverable
		>
			<Card.Meta
				title={props.title}
				description={props.description}
			/>
		</Card>
	);
}

export default ItemCard;