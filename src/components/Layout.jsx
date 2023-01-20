import Footer from "./Footer";
import Header from "./Header";
import Routes from "../routes/routes";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBloggerByAliasAsync } from "../features/user/bloggerSlice";

function Layout() {
	const params = useParams();
	const alias = params.alias;
	const dispatch = useDispatch();
	const blogger = useSelector((state) => state.blogger);
	const blog = useSelector((state) => state.blog);
	useEffect(() => {
		dispatch(getBloggerByAliasAsync(alias));
	}, [dispatch, alias]);

	return (
		// <HashRouter>
		<div className="App">
			<Header blogger={blogger}></Header>
			<div className="container">
				<div className="main">
					<Routes blogger={blogger} />
				</div>
			</div>
			{/* <Footer></Footer> */}
		</div>
		// </HashRouter>
	);
}

export default Layout;
