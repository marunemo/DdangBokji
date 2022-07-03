import React from 'react';
import { Col, Row } from 'antd';

function ItemGrid(props) {
	const { items } = props;
	console.log(items[0]);
	const gridList = [];
	var lastFullBundle = Math.floor(items.length / 4) * 4;
	for(let index = 0; index < lastFullBundle; index += 4) {
		gridList.push(
			<Row key={'itemRow' + index}>
				{[0, 1, 2, 3].map((colIndex) => {
					return (
						<Col key={'itemCol' + (index + colIndex)}>
							{items[index + colIndex]}
						</Col>
					);
				})}
			</Row>
		);
	}
	
	return gridList;
}

export default ItemGrid;