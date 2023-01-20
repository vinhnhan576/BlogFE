import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, HashRouter } from "react-router-dom";

import Layout from "./Layout";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { selectAccount } from "../features/account/accountSlice";
import PageNotFound from "../pages/PageNotFound";

const App = () => {
	const account = useSelector(selectAccount);

	return (
		<div className="App">
			{/* {account ? (
				<Layout />
			) : ( */}
			<HashRouter>
				<Routes>
					<Route path="/:alias/*" element={<Layout />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/" element={<Login />} />
				</Routes>
			</HashRouter>
			{/* )} */}
		</div>
	);
};

export default App;
