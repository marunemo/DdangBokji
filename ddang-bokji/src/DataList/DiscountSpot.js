import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import ItemCard from '../Utility/ListItem';
import ItemGrid from '../Utility/ItemGrid';
import LoadingSpin from '../Utility/LoadingSpin';
import emptyImg from '../Assets/no-pictures.png';

function DiscountSpotList(props) {
	const [spotData, setSpotData] = useState([]);
	const [isLoaded, setLoading] = useState(false);
	
	try {
		useEffect(() => {
			axios.get(`/${process.env.REACT_APP_MND_TOKEN}/json/DS_MND_ENLSTMN_DCNT_BEF_INF/1/89/`)
				.then((fetchData) => {
					const discountSpots = fetchData.data.DS_MND_ENLSTMN_DCNT_BEF_INF.row.map((discountSpot, index) => {
						return (
							<Link to={'/DiscountSpot/' + (index + 1)}>
								<ItemCard
									title={discountSpot.instltnnm}
									description={discountSpot.rgn}
									photoImage={emptyImg}
									imageDesc={discountSpot.instltnnm}
								/>
							</Link>
						)
					})
					setSpotData(discountSpots);
					setLoading(true);
			});
		}, []);
	}
	catch(e) {
		console.log(e);
	}
	
	if(!isLoaded)
		return <LoadingSpin />
		
	return <ItemGrid items={spotData} isBroken={props.isBroken} />;
}

export default DiscountSpotList;