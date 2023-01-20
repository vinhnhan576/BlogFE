import React, { useRef } from "react";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import alt from "../assets/image/blog/alt.jpg";

export default function Topic(props) {
	// const dispatch = useDispatch();
	// const userID = 13;
	// const topicID = props.id;
	// const allBlogs = useSelector((state) => state.blog);
	// useEffect(() => {
	// 	dispatch(getAllBlogsByUserIDAsync(userID));
	// }, [dispatch, userID]);
	// const allBlogsByTopic = allBlogs?.filter((blog) => blog.topicID === topicID);
	const allBlogsByTopic = props.blogs;
	var first2BlogsByTopic;
	const bodyImageRef = useRef();
	const onImgLoad = ({ target: img }) => {
		const { offsetHeight, offsetWidth } = img;
		if (offsetWidth > offsetHeight)
			bodyImageRef.current.classList.add("landscape");
		else bodyImageRef.current.classList.add("portrait");
	};

	if (window.matchMedia("(max-width: 500px)").matches) {
		first2BlogsByTopic = allBlogsByTopic.slice(0, 2);
	} else {
		first2BlogsByTopic = allBlogsByTopic.slice(1, 3);
	}
	const mainBlog = allBlogsByTopic[0];

	const allPostsElements = first2BlogsByTopic.map((blog) => {
		return (
            // eslint-disable-next-line react/jsx-pascal-case
            <BlogCard
                key={blog._id}
                id={blog._id}
                img={blog.coverImg}
                content={blog.content}
                title={blog.title}
                slug={blog.slug}
                alias={props.alias}
            />
        );
	});

	return (
        <div className="topicCard" id={props.id}>
            <div className="topic">
                <div className="topic__title">
                    {props.index % 2 === 0 && (
                        <Link to={`/${props.alias}/topic/${props.slug}`}>
                            {props.topicName.toUpperCase()}
                        </Link>
                    )}
                    <div className="topic__line"></div>
                    {props.index % 2 === 1 && (
                        <Link to={`/${props.alias}/topic/${props.slug}`}>
                            {props.topicName.toUpperCase()}
                        </Link>
                    )}
                </div>
            </div>
            <div className="featured-blogs">
                <div className="featured-blogs__main-blog">
                    <Link to={`/${props.alias}/blog/${mainBlog?.slug}`}>
                        <div className="featured-blogs__main-blog__image">
                            <div
                                className="featured-blogs__main-blog__image__container"
                                ref={bodyImageRef}
                            >
                                {mainBlog?.coverImg !== '' &&
                                typeof mainBlog?.coverImg !== 'undefined' ? (
                                    <img
                                        onLoad={onImgLoad}
                                        src={'data:image/jpg;base64,' + mainBlog.coverImg.toString('base64')}
                                        alt=""
                                    />
                                ) : (
                                    <img onLoad={onImgLoad} src={alt} alt="" />
                                )}
                            </div>
                        </div>
                        <div className="featured-blogs__main-blog__content">
                            <div className="featured-blogs__main-blog__content__border"></div>
                            <h3>{mainBlog?.title}</h3>
                            <p>{mainBlog?.content}</p>
                        </div>
                    </Link>
                </div>
                <div>{allPostsElements}</div>
            </div>
        </div>
    );
}
