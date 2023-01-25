import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogBySlugAsync } from '../features/post/blogSlice';
import Helmet from '../components/Helmet';
import Banner from '../components/Banner';
import { useDispatch, useSelector } from 'react-redux';
import PageNotFound from './PageNotFound';
import Comment from '../components/Comment';
import alt from '../assets/image/blog/alt.jpg';
import {
    createNewComment,
    getAllCommentsByBlogAsync,
} from '../features/comment/commentSlice';
import { useState } from 'react';
import Reply from '../components/Reply';
import { getBloggerByUserID } from '../features/user/bloggerSlice';
import axios, { Axios } from 'axios';
import serverUrl from '../features/common/common';

function Blog() {
    const params = useParams();
    const slug = params.slug;
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.user);
    const blogger = useSelector((state) => state.blogger);
    const user = useSelector((state) => state.user);
    const blogs = useSelector((state) => state.blog);
    const comments = useSelector((state) => state.comment);
    const blog = Array.isArray(blogs)
        ? blogs?.find((blog) => blog.slug === slug)
        : blogs;

    const [commentUser, setCommentUser] = useState([]);
    async function getBlog() {
        await dispatch(getBlogBySlugAsync(slug));
        await dispatch(getAllCommentsByBlogAsync(blog?._id));
    }

    useEffect(() => {
        getBlog();
    }, [dispatch, slug, blog?._id]);

    useEffect(() => {
        const fetchData = async () => {
            const commentUserID = [
                ...new Set(comments.map((comment) => comment.userID)),
            ];
            console.log(commentUserID);

            var user = [];
            await Promise.all(
                commentUserID.map(async (userID) => {
                    await axios(
                        `${serverUrl}api/user/get-user-by-id?userID=${userID}`
                    ).then((response) => {
                        console.log(response.data.result);
                        user.push(response.data.result);
                    });
                    // commentUser.push(result);
                })
            );
            setCommentUser(user);
        };
        fetchData();
    }, [comments]);

    console.log(commentUser);

    // console.log(comments);

    if (typeof blog === 'object')
        // if (blog)
        return (
            <Helmet title="Blog">
                <div className="blog">
                    {blog.coverImg !== undefined ? (
                        <Banner
                            img={
                                'data:image/jpg;base64,' +
                                blog.coverImg.toString('base64')
                            }
                            alt={alt}
                            quote={blog.quote}
                        />
                    ) : (
                        <Banner img={alt} alt={alt} quote={blog.quote} />
                    )}
                    <div className="blog__timestamp">{`${
                        blog.location === undefined ? blog.location + ' - ' : ''
                    }${
                        blog.date === undefined ? '' : blog.date.slice(0, 10)
                    }`}</div>
                    <div className="blog__content">
                        <div className="blog__content__title">{blog.title}</div>
                        <div className="blog__content__body">
                            {blog.content}
                        </div>
                        <div className="blog__content__signature">
                            {blog.signature}
                        </div>
                    </div>
                </div>
                <div className="comment-section">
                    <Reply
                        blogID={blog._id}
                        userID={user._id}
                        isHeadComment={true}
                        parentID=""
                    />
                    {comments.map((comment) => {
                        return (
                            <Comment
                                comment={comment}
                                key={comment._id}
                                blogID={blog._id}
                                userID={user._id}
                                commentUser={commentUser}
                                alias={blogger.alias}
                                head={true}
                                lastchild={false}
                            />
                        );
                    })}
                </div>
            </Helmet>
        );
}

export default Blog;
