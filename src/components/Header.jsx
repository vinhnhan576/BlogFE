import React, { useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccount } from '../features/account/accountSlice';
import DropdownMenu from './DropdownMenu';
import SettingsMenu from './SettingsMenu';

import alt from '../assets/image/user/alt.png';
import { useState } from 'react';
import NoTopicNotif from './NoTopicNotif';
const mainNav = [
    {
        display: 'TRANG CHỦ',
        path: '/',
    },
    {
        display: 'TỚ LÀ?',
        path: '/about',
    },
    // {
    // 	display: "CHỦ ĐỀ",
    // 	path: "/",
    // },
];

const settings = [
    { name: 'Cài đặt', slug: '/settings' },
    {
        name: 'Đăng xuất',
        slug: '/',
    },
];

function Header(props) {
    const params = useParams();
    const pathName = useLocation().pathname;
    var activeNav = mainNav.findIndex(
        (e) => `/${params.alias}`.concat(e.path) === pathName
    );

    const navigate = useNavigate();

    var currentTopic;
    const blog = useSelector((state) => state.blog);
    const topics = props.blogger.Topic;
    // useEffect(() => {
    // 	if (typeof slug !== "object") {
    // 		dispatch(getAllTopicBySlugAsync(slug.current));
    // 		dispatch(getBlogBySlugAsync(slug.current));
    // 	}
    // }, [dispatch, slug]);
    const slugType = params['*'].split('/')[0];
    switch (slugType) {
        case 'topic':
            if (topics)
                // if (!Array.isArray(topics) && typeof topics !== "string") {
                currentTopic = topics
                    .find((topic) => topic.slug === params['*'].split('/')[1])
                    ?.topicName.toUpperCase();
            // }
            break;
        case 'blog':
            if (blog)
                if (!Array.isArray(blog) && typeof blog !== 'string') {
                    currentTopic = blog.Topic?.topicName.toUpperCase();
                }
            break;
        default:
            break;
    }

    currentTopic && (activeNav = 2);

    const headerRef = useRef();
    const logoRef = useRef();
    const containerRef = useRef();

    const account = useSelector(selectAccount);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (document.documentElement.scrollTop > 80) {
                headerRef.current?.classList?.add('shrink');
                logoRef.current?.classList?.add('shrink');
                containerRef.current?.classList?.add('shrink');
            } else {
                headerRef.current?.classList?.remove('shrink');
                logoRef.current?.classList?.remove('shrink');
                containerRef.current?.classList?.remove('shrink');
            }
        });
        return () => {
            window.removeEventListener('scroll', null);
        };
    }, []);

    const menuLeft = useRef(null);
    const menuToggle = () => menuLeft.current.classList.toggle('active');

    const [openTopics, setOpenTopics] = useState(false);

    const [noTopicNotif, setNoTopicNotif] = useState(false);

    const [openSettings, setOpenSettings] = useState(false);

    return (
        <div className="header" ref={headerRef}>
            <div className="container" ref={containerRef}>
                <div className="header__logo" ref={logoRef}>
                    <Link to="/BlogProject/">
                        <p>{props?.blogger?.alias}'s Blog</p>
                    </Link>
                </div>
                <div className="header__menu">
                    <div
                        className="header__menu__mobile-toggle"
                        onClick={menuToggle}
                    >
                        <i className="bx bx-menu-alt-left"></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div
                            className="header__menu__left__close"
                            onClick={menuToggle}
                        >
                            <i className="bx bx-x"></i>
                        </div>
                        {mainNav?.map((item, index) => (
                            <div
                                onClick={menuToggle}
                                key={index}
                                className={`header__menu__left__item header__menu__item ${
                                    activeNav === index ? 'active' : ''
                                }`}
                            >
                                <Link to={`/${params.alias}${item.path}`}>
                                    {item.display}
                                </Link>
                            </div>
                        ))}
                        <div
                            onClick={() => {
                                // menuToggle();
                                topics.length !== 0
                                    ? setOpenTopics(!openTopics)
                                    : setNoTopicNotif(!noTopicNotif);
                            }}
                            className={`header__menu__left__item header__menu__item ${
                                activeNav === 2 ? 'active' : ''
                            }`}
                        >
                            {params['*'].includes('topic') ||
                            params['*'].includes('blog')
                                ? currentTopic
                                : 'CHỦ ĐỀ'}
                            {openTopics && (
                                <DropdownMenu
                                    blogger={props.blogger}
                                    onclick={menuToggle}
                                />
                            )}
                            {noTopicNotif && (
                                <NoTopicNotif
                                    onCloseButtonClick={() =>
                                        setNoTopicNotif(!noTopicNotif)
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__right__item header__menu__item">
                            {/* <i className="bx bx-search"></i>
							<i className="bx bx-wrench"></i>
							<i className="bx bx-bell"></i> */}
                        </div>
                        {account ? (
                            <div
                                className="header__menu__right__pfp"
                                onClick={() => setOpenSettings(!openSettings)}
                            >
                                {props?.blogger?.profilepic !== '' &&
                                typeof props.blogger.profilepic !==
                                    'undefined' ? (
                                    <img
                                        src={'data:image/jpg;base64,' + props.blogger.profilepic}
                                        alt={alt}
                                    />
                                ) : (
                                    <img src={alt} alt={alt} />
                                )}
                            </div>
                        ) : (
                            <div className="header__menu__right__login-button">
                                <button onClick={() => navigate('/')}>
                                    Đăng nhập
                                </button>
                            </div>
                        )}
                        {openSettings && (
                            <SettingsMenu
                                alias={props?.blogger?.alias}
                                settings={settings}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
