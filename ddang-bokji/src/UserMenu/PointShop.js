import React, { useState, useEffect, useMemo } from 'react';
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
				badge: snapshot.val().badge,
			})
		})
		.catch(error => console.log(error));
	}, [user]);

	try {
		useEffect(() => {
			if(userStatus) {
				userStatus.then(({ point, badge }) => {
					setDdangPoint(point);
					const items = shopItemList.map((item) => {
						return (
							<ShopItem
								title={item.name}
								description={item.desc}
								photoImage={item.image}
								imageDesc={item.name}
								isActived={badge === undefined || !(item.name in badge)}
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

	return <ItemGrid items={shopItems} />
}

export default PointShop;