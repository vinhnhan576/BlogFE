import React from "react";
import Helmet from "../components/Helmet";
import Banner from "../components/Banner";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBloggerByAliasAsync } from "../features/user/bloggerSlice";
import CategoryCard from "../components/CategoryCard";
import PageNotFound from "./PageNotFound";
import { useState } from "react";
import alt from "../assets/image/topic/alt.jpg";

function Category() {
	const dispatch = useDispatch();
	const params = useParams();
	const alias = params.alias;
	const blogger = useSelector((state) => state.blogger);
	useEffect(() => {
		dispatch(getBloggerByAliasAsync(alias));
	}, [dispatch, alias]);
	
	const topic = blogger.Topic?.find((topic) => topic.slug === params.slug);
	// const allBlogsByTopic = Array.isArray(allBlogs)
	// 	? allBlogs?.filter((blog) => blog.Topic.slug === params.slug)
	// 	: [allBlogs];
	const allBlogsByTopic = topic ? topic.Blog : null;

	if (
		(typeof topic !== "undefined" && topic.length === 0) ||
		typeof topic === "string"
	)
		return <PageNotFound />;

	if (topic)
		return (
			<div>
				<Helmet title="Chủ đề">
					<div className="allCategoryCards">
						<div className="allCategoryCards_banner">
							{topic.img !== undefined && topic.img !== '' ? (
								<Banner
									img={'data:image/jpg;base64,' + topic.img.toString('base64')}
									width="100"
									height="440"
									quote={topic.quote}
								/>
							) : (
								<Banner
									img={alt}
									width="100"
									height="440"
									quote={topic.quote}
								/>
							)}
						</div>
						<div className="allCategoryCards_container">
							{allBlogsByTopic.map((blog, index) => {
								return (
									<CategoryCard
										key={index}
										id={blog.id}
										img={blog.coverImg}
										date={`${
											blog.location !== null ? blog.location + " - " : ""
										}${blog.date !== undefined ? blog.date.slice(0, 10) : ""}`}
										title={`${blog.title}`}
										content={`${blog.content}`}
										slug={`${blog.slug}`}
										blogger={blogger}
									/>
								);
							})}
						</div>
					</div>
				</Helmet>
			</div>
		);
}

export default Category;
