import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeContainer from './Home';
import TouristSpotInfo from '../DataList/TouristSpotInfo';

function MainRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<HomeContainer />}
				/>
				<Route
					path="/TouristSpot/:id"
					element={<TouristSpotInfo />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default MainRouter;