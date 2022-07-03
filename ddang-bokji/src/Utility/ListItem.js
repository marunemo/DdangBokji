import React from 'react';
import { Card, Image } from 'antd';

function ItemCard(props) {
	return (
		<Card
			style={{
				width: '100%'
			}}
			cover={
				<Image
					alt={props.imageDesc}
					src={props.photoImage}
					// Empty icons created by LAFS - Flaticon
					fallback="https://cdn-icons.flaticon.com/png/512/3586/premium/3586675.png?token=exp=1656836791~hmac=9ab5c8883e35964c0a42820f9065b528"
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