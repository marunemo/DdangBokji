import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Space } from 'antd';
import { getDatabase, ref, get, child } from "firebase/database";
import ShopItem from '../Utility/ShopItem';
import ItemGrid from '../Utility/ItemGrid';
import LoadingSpin from '../Utility/LoadingSpin';
import shopItemList from '../Utility/ShopItemList';

function PointShop(props) {
	const [ddangPoint, setDdangPoint] = useState(0);
	const [shopItems, setShopItems] = useState(null);
	const { user } = props;

	const userStatus = useMemo(() => {
		if(!user)
			return null;
		
		return get(child(ref(getDatabase()), 'users/' + user.uid)).then((snapshot) => {
			if(!snapshot.exists())
				return null;
			
			return ({
				point: snapshot.val().point,
				badgeList: snapshot.val().badgeList,
			})
		})
		.catch(error => console.log(error));
	}, [user]);

	try {
		useEffect(() => {
			if(userStatus) {
				userStatus.then(({ point, badgeList }) => {
					setDdangPoint(point);
					const items = shopItemList.map((item) => {
						return (
							<ShopItem
								title={item.name}
								description={item.desc}
								photoImage={item.image}
								imageDesc={item.itemCode}
								price={item.price}
								isActived={!(badgeList.includes(item.itemCode))}
							/>
						);
					});
					setShopItems(items);
				})
			}
		}, [userStatus]);
	}
	catch(e) {
		console.log(e);
	}
	
	if(user === null || shopItems === null)
		return <LoadingSpin />

	return (
		<Layout style={styles.bodyLayout}>
			<div style={styles.pointHeader}>
				<Space style={styles.myPoint}>내 땡포인트 : <b>{ddangPoint}</b></Space>
			</div>
			<Layout style={styles.contentLayout}>
				<ItemGrid items={shopItems} />
			</Layout>
		</Layout>
	);
}

export default PointShop;

const styles = {
	bodyLayout: {
		minHeight: '100%',
		padding: 0,
		margin: 0,
		backgroundColor: 'transparent',
	},
	pointHeader: {
		backgroundColor: 'transparent',
		textAlign: 'end',
		padding: '15px 10px'
	},
	contentLayout: {
		backgroundColor: 'transparent',
		padding: '15px 0 0'
	},
	myPoint: {
		padding: '10px 20px',
		border: '1px solid #000',
		borderRadius: '25px',
		fontSize: '14pt',
		backgroundColor: '#fff'
	}
}