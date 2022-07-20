import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import ItemCard from '../Utility/ListItem';
import ItemGrid from '../Utility/ItemGrid';
import LoadingSpin from '../Utility/LoadingSpin';

function TMOSpotList() {
	const [spotData, setSpotData] = useState([]);
	const [isLoaded, setLoading] = useState(false);
	
	try {
		useEffect(() => {
			axios.get(`/${process.env.REACT_APP_MND_TOKEN}/json/DS_TB_MND_TMO_INFO/1/48/`)
				.then((fetchData) => {
					const tmoSpots = fetchData.data.DS_TB_MND_TMO_INFO.row.map((tmoSpot, index) => {
						return (
							<Link to={'/TMOSpot/' + (index + 1)}>
								<ItemCard
									title={tmoSpot.tmo_nm + "TMO"}
									description={tmoSpot.pstnexpln}
									photoImage={null}
									imageDesc={tmoSpot.tmo_nm}
								/>
							</Link>
						)
					})
					setSpotData(tmoSpots);
					setLoading(true);
			});
		}, []);
	}
	catch(e) {
		console.log(e);
	}
	
	if(!isLoaded)
		return <LoadingSpin />
		
	return <ItemGrid items={spotData} />;
}

export default TMOSpotList;