import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeContainer from './Home';

function MainRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<HomeContainer />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default MainRouter;