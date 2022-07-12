import React from 'react';
import { Card, Image } from 'antd';
import emptyImg from '../Assets/no-pictures.png';

function ItemCard(props) {
	return (
		<Card
			className="cardLayout"
			cover={
				<Image
					className="cardImage"
					width="100%"
					height="100%"
					alt={props.imageDesc}
					src={props.photoImage}
					fallback={emptyImg}
					preview={false}
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