import React from "react";
import Helmet from "../components/Helmet";
import Topic from "../components/Topic";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import alt from "../assets/image/user/alt.png";

function Home({ blogger }) {
	// const allTopics = useSelector((state) => state.topic);
	const user = useSelector((state) => state.user);
	// const userID = blogger.id;
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch(getAllTopicsByUserIDAsync(userID));
	// }, [dispatch, userID]);
	var allTopicElements;
	if (blogger._id) {
		allTopicElements = blogger.Topic.map((topic, index) => {
			return (
				<Topic
					key={index}
					index={index}
					id={topic._id}
					userID={topic.userID}
					topicName={topic.topicName}
					slug={topic.slug}
					blogs={topic.Blog}
					alias={blogger.alias}
				/>
			);
		});
	}

	const isEqual = (...objects) =>
		objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));
	const isLoggedIn = isEqual(user, blogger);

	return (
		<div>
			<Helmet title="Trang chủ">
				{
					<div className="home">
						{isLoggedIn ? (
							<div className="home__new-blog">
								<Link to={`/${user.alias}/newBlog`} className="home__link">
									<div className="home__new-blog__pfp">
										{blogger.profilepic !== undefined ? (
											<img
												src={'data:image/jpg;base64,' + blogger.profilepic}
												alt={alt}
											/>
										) : (
											<img src={alt} alt={alt} />
										)}
									</div>
									<div className="home__new-blog__placeholder">
										{"Tạo nguồn cảm hứng mới <3"}
									</div>
								</Link>
							</div>
						) : (
							""
						)}
						<div className="home__topics">{allTopicElements}</div>
					</div>
				}
			</Helmet>
		</div>
	);
}

export default Home;
