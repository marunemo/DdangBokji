import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Layout, Space, Modal, Image, message } from 'antd';
import { getDatabase, ref, get, child, update } from "firebase/database";
import ShopItem from '../Utility/ShopItem';
import ItemGrid from '../Utility/ItemGrid';
import LoadingSpin from '../Utility/LoadingSpin';
import shopItemList from '../Utility/ShopItemList';
import ddangLogo from '../Assets/ddang-logo.png';

function PointShop(props) {
	const [ddangPoint, setDdangPoint] = useState(0);
	const [shopItems, setShopItems] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);
	const { user, isBroken } = props;

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
	
	const buyItem = useCallback((currentItem, currentPoint, currentBadge) => {
		if((currentPoint - currentItem.price) < 0) {
			message.error({
				content: '포인트가 부족합니다!',
				key: 'pointError'
			});
			return;
		}
		else if(currentItem.itemCode === '야놀자' || currentItem.itemCode === '여기어때') {
			message.error({
				content: '개발중인 항목입니다!',
				key: 'typeError'
			});
			return;
		}
		
		update(ref(getDatabase(), 'users/' + user.uid), {
			point: currentPoint - currentItem.price,
			badgeList: [...currentBadge, currentItem.itemCode]
		})
		.then(() => {
			message.loading({
				content: '구매 중...',
				key: 'buyLoading',
				duration: 0
			});
			
			get(child(ref(getDatabase()), 'users/' + user.uid)).then((snapshot) => {
				if(!snapshot.exists())
					return null;

				return ({
					point: snapshot.val().point,
					badgeList: snapshot.val().badgeList,
				});
			})
			.then(({ point, badgeList }) => {
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
							onClick={() => setSelectedItem(item)}
							isBroken={isBroken}
						/>
					);
				});
				setShopItems(items);
			})
			.then(() => {
				message.success({
					content: '구매 완료!',
					key: 'buyLoading'
				});
			});
		});
		
		setSelectedItem(null);
	}, [user, isBroken]);

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
								onClick={() => setSelectedItem(item)}
								isBroken={isBroken}
							/>
						);
					});
					setShopItems(items);
				})
			}
		}, [userStatus, isBroken]);
	}
	catch(e) {
		console.log(e);
	}
	
	if(user === null || shopItems === null)
		return <LoadingSpin />

	return (
		<Layout style={styles.bodyLayout}>
			<div style={styles.pointHeader}>
				<Space style={styles.myPoint}>
					내 <img style={{ width: '16pt', height: '16pt' }} src={ddangLogo} alt="땡"/>포인트 : <b>{ddangPoint}</b>
				</Space>
			</div>
			<Layout style={styles.contentLayout}>
				<ItemGrid items={shopItems} isBroken={props.isBroken} />
			</Layout>
			<Modal
				visible={selectedItem !== null}
				centered={true}
				title="아이템 구매"
				okText="구매"
				cancelText="취소"
				onOk={() => userStatus.then((status) => buyItem(selectedItem, status.point, status.badgeList))}
				onCancel={() => setSelectedItem(null)}
			>
				{
					selectedItem &&
					(
						<div style={styles.modalContainter}>
							<Image src={selectedItem.image} />
							<p style={styles.selectedItemName}>{selectedItem.name}</p>
							<p style={styles.selectedItemDesc}>{selectedItem.desc}</p>
							<Space
								style={{ fontSize: '12pt' }}
								direction="horizontal"
								size="middle"
							>
								<div>
									<p><b>현재 <img style={{ width: '14pt', height: '14pt' }} src={ddangLogo} alt="땡"/>포인트</b></p>
									<p>{ddangPoint}</p>
								</div>
								<p style={{ fontSize: '16pt' }}> - </p>
								<div>
									<p><b>사용할 <img style={{ width: '14pt', height: '14pt' }} src={ddangLogo} alt="땡"/>포인트</b></p>
									<p>{selectedItem.price}</p>
								</div>
								<p style={{ fontSize: '16pt' }}> = </p>
								<div>
									<p><b>잔여 <img style={{ width: '14pt', height: '14pt' }} src={ddangLogo} alt="땡"/>포인트</b></p>
									<p
										style={styles.restPoint(ddangPoint - selectedItem.price)}
									>
										{ddangPoint - selectedItem.price}
									</p>
								</div>
							</Space>
							<p style={styles.buyPrompt}>해당 아이템을 구매하시겠습니까?</p>
						</div>
					)
				}
			</Modal>
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
	},
	modalContainter: {
		textAlign: 'center',
		justifyContent: 'center'
	},
	selectedItemName: {
		fontSize: '18pt',
		fontWeight: 'bold'
	},
	selectedItemDesc: {
		fontSize: '15pt'
	},
	buyPrompt: {
		fontSize: '16pt',
		fontWeight: 'bold'
	},
	restPoint: (point) => ({
		color: (point < 0) ? '#f33' : '#000'
	})
}