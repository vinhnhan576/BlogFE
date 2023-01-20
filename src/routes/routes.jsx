import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Category from "../pages/Category";
import About from "../pages/About";
import Blog from "../pages/Blog";
import NewBlog from "../pages/NewBlog";
import EditBlog from "../pages/EditBlog";
import Settings from "../pages/Settings";

function routes(props) {
	return (
		<Routes>
			<Route path="/" exact element={<Home blogger={props.blogger} />} />
			<Route path="/about" element={<About blogger={props.blogger} />} />
			<Route path="/topic/:slug" element={<Category />} />
			<Route path="/blog/:slug" element={<Blog name={props.blogger.name} />} />
			<Route
				path="/newBlog"
				element={
					<NewBlog alias={props.blogger.alias} blogger={props.blogger} />
				}
			/>
			<Route
				path="/editBlog/:slug"
				element={<EditBlog alias={props.blogger.alias} />}
			/>
			<Route path='/settings' element={< Settings blogger = {props.blogger} />}/>
		</Routes>
	);
}

export default routes;
