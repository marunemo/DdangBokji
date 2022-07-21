import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import ItemCard from '../Utility/ListItem';
import ItemGrid from '../Utility/ItemGrid';
import LoadingSpin from '../Utility/LoadingSpin';

function TouristSpotList(props) {
	const [spotData, setSpotData] = useState([]);
	const [isLoaded, setLoading] = useState(false);
	
	try {
		useEffect(() => {
			axios.get(`/${process.env.REACT_APP_MND_TOKEN}/json/DS_MND_GUN_WLFRINSTLTN_SRNDT/1/17/`)
				.then((fetchData) => {
					const tourSpots = fetchData.data.DS_MND_GUN_WLFRINSTLTN_SRNDT.row.map((tourSpot, index) => {
						return (
							<Link to={'/TouristSpot/' + (index + 1)}>
								<ItemCard
									title={tourSpot.rel_instltnnm}
									description={tourSpot.instltnpstn}
									photoImage={tourSpot.image_file}
									imageDesc={tourSpot.phototitle}
								/>
							</Link>
						)
					})
					setSpotData(tourSpots);
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

export default TouristSpotList;