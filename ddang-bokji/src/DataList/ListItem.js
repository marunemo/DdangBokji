import React from 'react';
import { Card } from 'antd';

function ItemCard(props) {
	return (
		<Card
			title={props.title}
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