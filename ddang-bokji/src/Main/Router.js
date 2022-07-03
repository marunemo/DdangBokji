import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeContainer from './Home';
import SpotInfo from '../Utility/SpotInfo';

function MainRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<HomeContainer />}
				/>
				<Route
					path="//:id"
					element={<SpotInfo />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default MainRouter;