import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import ItemCard from '../Utility/ListItem';
import ItemGrid from '../Utility/ItemGrid';
import LoadingSpin from '../Utility/LoadingSpin';

function ResortSpotList() {
	const [spotData, setSpotData] = useState([]);
	const [isLoaded, setLoading] = useState(false);
	
	try {
		useEffect(() => {
			axios.get(`/${process.env.REACT_APP_MND_TOKEN}/json/DS_WHLAM_WLFR_VCTNINSTLT/1/13/`)
				.then((fetchData) => {
					const resortSpots = fetchData.data.DS_WHLAM_WLFR_VCTNINSTLT.row.map((resortSpot) => {
						return (
							<Link to={'/ResortSpot/' + resortSpot.rowno}>
								<ItemCard
									title={resortSpot.instltn_nm}
									description={resortSpot.pstn_addr}
									photoImage={null}
									imageDesc={resortSpot.instltn_nm}
								/>
							</Link>
						)
					})
					setSpotData(resortSpots);
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

export default ResortSpotList;