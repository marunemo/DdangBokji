import React from 'react';
import { Spin, Space } from 'antd';

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
			<Spin
				size="large"
				tip={
					<p
						style={{
							fontSize: '16pt',
							fontWeight: 'bold'
						}}
					>
						잠시만 기다려주세요...
					</p>
				}
			/>
		</Space>
	);
}