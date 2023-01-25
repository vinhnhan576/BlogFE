import React, { useEffect, useState } from 'react';
import Helmet from '../components/Helmet';
import Topic from '../components/Topic';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import alt from '../assets/image/user/alt.png';
import wreath from '../assets/image/laurel-wreath.png';
import axios from 'axios';
import serverUrl from '../features/common/common';
import BloggerCard from '../components/BloggerCard';

function Home() {
    // const allTopics = useSelector((state) => state.topic);
    // const user = JSON.parse(localStorage.getItem('user'))?.account;

    const user = useSelector((state) => state.user);
    const blogger = useSelector((state) => state.blogger);

    const topNum = 5;
    const [topBloggers, setTopBloggers] = useState([]);
    useEffect(() => {
        // const fetchData = async () => {
        //     const result = (
        //         await
        //     ).data.result;
        //     console.log(result);
        //     setTopBloggers(topBloggers);
        //     console.log(topBloggers);
        // };
        // fetchData();
        axios(
            `${serverUrl}api/user/get-top-bloggers?bloggerNum=${topNum}`
        ).then((response) => setTopBloggers(response.data.result));
    }, []);

    console.log(topBloggers);

    const topic = blogger.alias === user.alias ? user.Topic : blogger.Topic;

    const allTopicElements =
        blogger._id &&
        topic.map((topic, index) => {
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

    var isLoggedIn = user && blogger.alias === user.alias;
    return (
        <div>
            <Helmet title="Trang chủ">
                {
                    <div className="home">
                        <div className="home__top-bloggers">
                            <div className="home__top-bloggers__title">
                                <img src={wreath} alt="" />
                                <p>Bloggers of the month</p>
                                <img id="image2" src={wreath} alt='' />
                            </div>
                            <div className="home__top-bloggers__bloggers">
                                {topBloggers.map((blogger) => (
                                    <Link to={`/${blogger.alias}/`}>
                                        <BloggerCard blogger={blogger} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                        {isLoggedIn ? (
                            <div className="home__new-blog">
                                <Link
                                    to={`/${user.alias}/newBlog`}
                                    className="home__link"
                                >
                                    <div className="home__new-blog__pfp">
                                        {blogger.profilepic !== '' &&
                                        blogger.profilepic !== undefined ? (
                                            <img
                                                src={
                                                    'data:image/jpg;base64,' +
                                                    blogger.profilepic
                                                }
                                                alt={alt}
                                            />
                                        ) : (
                                            <img src={alt} alt={alt} />
                                        )}
                                    </div>
                                    <div className="home__new-blog__placeholder">
                                        {'Tạo nguồn cảm hứng mới <3'}
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            ''
                        )}
                        <div className="home__topics">{allTopicElements}</div>
                    </div>
                }
            </Helmet>
        </div>
    );
}

export default Home;
