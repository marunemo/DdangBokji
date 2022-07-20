import React, { useState, useEffect, useMemo } from 'react';
import { getDatabase, ref, get, child } from "firebase/database";
import ShopItem from '../Utility/ShopItem';
import ItemGrid from '../Utility/ItemGrid';
import LoadingSpin from '../Utility/LoadingSpin';

import img_private from '../Assets/private.png';
import img_private_first_class from '../Assets/private-first-class.png';
import img_corporal from '../Assets/corporal.png';
import img_sergeant from '../Assets/sergeant.png';

function PointShop(props) {
	const [ddangPoint, setDdangPoint] = useState(0);
	const [shopItems, setShopItems] = useState(null);
	const { user } = props;
	
	const shopItemList = [
		{
			name: '이병 약장',
			desc: '자신의 뱃지에 이병 약장을 추가합니다.',
			image: img_private
		},
		{
			name: '일병 약장',
			desc: '자신의 뱃지에 일병 약장을 추가합니다.',
			image: img_private_first_class
		},
		{
			name: '상병 약장',
			desc: '자신의 뱃지에 상병 약장을 추가합니다.',
			image: img_corporal
		},
		{
			name: '병장 약장',
			desc: '자신의 뱃지에 병장 약장을 추가합니다.',
			image: img_sergeant
		}
	];

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
								isActivated={badge !== undefined && item.name in badge}
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