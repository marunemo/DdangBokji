import React from 'react';
import { Col, Row } from 'antd';

function ItemGrid(props) {
	const { items } = props;
	const divider = props.isBroken ? 2 : 4;

	const gridList = [];
	var lastFullBundle = Math.floor(items.length / divider) * divider;
	for(let index = 0; index < lastFullBundle; index += divider) {
		gridList.push(
			<Row
				key={'itemRow' + index}
				style={{ marginBottom: '3%' }}
				gutter={16}
			>
				{(props.isBroken ? [0, 1] : [0, 1, 2, 3]).map((colIndex) => {
					return (
						<Col
							key={'itemCol' + (index + colIndex)}
							span={props.isBroken ? 12 : 6}
						>
							{items[index + colIndex]}
						</Col>
					);
				})}
			</Row>
		);
	}
	if(items.length % divider !== 0) {
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
							span={props.isBroken ? 12 : 6}
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