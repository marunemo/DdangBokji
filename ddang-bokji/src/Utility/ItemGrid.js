import React from 'react';
import { Col, Row } from 'antd';

function ItemGrid(props) {
	const { items } = props;

	const gridList = [];
	var lastFullBundle = Math.floor(items.length / 4) * 4;
	for(let index = 0; index < lastFullBundle; index += 4) {
		gridList.push(
			<Row
				key={'itemRow' + index}
				style={{ marginBottom: '3%' }}
				gutter={16}
			>
				{[0, 1, 2, 3].map((colIndex) => {
					return (
						<Col
							key={'itemCol' + (index + colIndex)}
							span={6}
						>
							{items[index + colIndex]}
						</Col>
					);
				})}
			</Row>
		);
	}
	if(items.length % 4 !== 0) {
		gridList.push(
			<Row
				key={'itemRow' + lastFullBundle}
				style={{ marginBottom: '3%' }}
				gutter={16}
			>
				{Array.from(Array(items.length - lastFullBundle).keys()).map((colIndex) => {
					return (
						<Col
							key={'itemCol' + (lastFullBundle + colIndex)}
							span={6}
						>
							{items[lastFullBundle + colIndex]}
						</Col>
					);
				})}
			</Row>
		);
	}
	
	return gridList;
}

export default ItemGrid;