import React from 'react';
import { Spin, Space, Typography } from 'antd';

export default function LoadingSpin() {
	return(
		<Space
			style={{
				width: '100%',
				height: '100%',
				justifyContent: 'center'
			}}
			direction="horizontal"
			align="center"
			size="middle"
		>
			<Spin size="large" />
			<Typography.Title
				style={{ color: 'red' }}
				level={2}
			>
				Loading...
			</Typography.Title>
		</Space>
	);
}