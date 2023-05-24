import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authenticateUserAsync } from '../features/account/accountSlice';
import { getUserByUsernameAsync } from '../features/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';

import bannerPic1 from '../assets/image/login/banner-pic-1.png';
import bannerPic2 from '../assets/image/login/banner-pic-2.png';
import logo from '../assets/image/login/logo.png';
import { unwrapResult } from '@reduxjs/toolkit';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    // if(user){
    //     console.log(user)
    //     navigate('/' + user.alias + '/')
    // }
    var initialUserState = {
        username: '',
        password: '',
    };

    document.addEventListener('onautocomplete', function (e) {
        if (e.target.hasAttribute('autocompleted'))
            // true or false
            console.log(e.target);
        // e.preventDefault(); // prevent autocomplete
    });

    const [account, setAccount] = useState(initialUserState);

    const [blogger, setBlogger] = useState('');

    const handleChange = (input) => (event) => {
        setAccount({ ...account, [input]: event.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('logging in...');
        await dispatch(
            authenticateUserAsync({
                username: account.username,
                password: account.password,
            })
        );
        const result = await dispatch(
            getUserByUsernameAsync({
                username: account.username,
            })
        );
        const originalPromiseResult = unwrapResult(result);
        const alias = result.payload.tasks.result.alias;
        navigate(`/${alias}/`);
        if (originalPromiseResult.tasks.alias !== undefined)
            navigate(`/${originalPromiseResult.tasks.alias}/`);
    };

    const leftBg = useRef();
    const logoRef = useRef();
    const lowerRef = useRef();
    const leftRef = useRef();
    const rightRef = useRef();
    const backRef = useRef();
    const onMobileLoginClick = () => {
        leftBg.current.classList.toggle('login-clicked');
        logoRef.current.classList.toggle('login-clicked');
        lowerRef.current.classList.toggle('login-clicked');
        rightRef.current.classList.toggle('login-clicked');
        backRef.current.classList.toggle('login-clicked');
    };

    const onPCSignupClick = () => {
        leftRef.current.classList.toggle('signup-clicked');
        rightRef.current.classList.toggle('signup-clicked');
    };

    const [logoHeight, setLogoHeight] = useState('');

    useEffect(
        () => setLogoHeight(leftBg.current?.clientHeight + 18 + 'px'),
        [leftBg]
    );

    // const onMobileBackBtnClick = () => {
    //     leftBg.current.classList.remove('login-clicked');
    //     logoRef.current.classList.remove('login-clicked');
    //     lowerRef.current.classList.remove('login-clicked');
    //     rightRef.current.classList.remove('login-clicked');
    //     backRef.current.classList.remove('login-clicked');
    // }

    return (
        <div className="login">
            <div className="login__container">
                <div className="login__left" ref={leftRef}>
                    {/* <img src={loginImage01} alt="" /> */}
                    <div className="login__left__bg" ref={leftBg}>
                        <img
                            src={bannerPic1}
                            alt=""
                            className="login__left__bg__pic1"
                        />
                        {/* <img
                            src={bannerPic2}
                            alt=""
                            className="login__left__bg__pic2"
                        /> */}
                        <div className="login__left__bg__message">
                            <div className="login__left__bg__message__upper">
                                Writing isn't just a hobby,
                            </div>
                            <div className="login__left__bg__message__lower">
                                It's a{' '}
                                <span className="login__left__bg__message__lower__highlight">
                                    self-improvement
                                </span>{' '}
                                activity!
                            </div>
                        </div>
                    </div>
                    <div
                        className="login__logo__mobile"
                        ref={logoRef}
                        style={{
                            top: logoHeight,
                        }}
                    >
                        <img src={logo} alt="" />
                    </div>
                    <div className="login__lower" ref={lowerRef}>
                        {/* <div className="login__lower__message">
                            Dive into the ocean of inspiration
                        </div> */}
                        <button
                            onClick={onMobileLoginClick}
                            className="login__form__button login__left__login-btn"
                        >
                            Login
                        </button>
                        <div className="login__form__or login__lower__or">
                            <div className="login__form__or__text">or</div>
                        </div>
                        <div className="login__form__item login__form__find">
                            {/* <div className="login__form__item__title">
                                tài khoản
                            </div> */}
                            <input
                                type="text"
                                name="find"
                                id="find"
                                autoComplete="off"
                                aria-labelledby="placeholder-fname"
                                value={blogger}
                                onChange={(e) => setBlogger(e.target.value)}
                            />
                            <label
                                className="login__form__item__placeholder-text"
                                for="fname"
                                id="placeholder-fname"
                            >
                                <div className="login__form__item__text">
                                    Find a blogger
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="login__right" ref={rightRef}>
                    <div
                        className="login__right__back"
                        onClick={onMobileLoginClick}
                        ref={backRef}
                    >
                        {'<'}
                    </div>
                    <form
                        className="login__form"
                        onSubmit={handleLogin}
                        autoComplete="off"
                    >
                        <div className="login__logo">
                            <img src={logo} alt="" />
                        </div>
                        <div className="login__welcome">Welcome!</div>
                        <div className="login__welcome2">
                            Enter your username and password <br /> and we're
                            ready to go
                        </div>
                        <div className="login__form__item">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="off"
                                aria-labelledby="placeholder-fname"
                                value={account.username}
                                onChange={handleChange('username')}
                            />
                            <label
                                className="login__form__item__placeholder-text"
                                for="fname"
                                id="placeholder-fname"
                            >
                                <div className="login__form__item__text">
                                    Username
                                </div>
                            </label>
                        </div>
                        <div className="login__form__item">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="off"
                                aria-labelledby="placeholder-fname"
                                value={account.password}
                                onChange={handleChange('password')}
                            />
                            <label
                                className="login__form__item__placeholder-text"
                                for="fname"
                                id="placeholder-fname"
                            >
                                <div className="login__form__item__text">
                                    Password
                                </div>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="login__form__button login__form__login-button"
                        >
                            Login
                        </button>
                        <div className="login__form__or login__right__or">
                            <div className="login__form__or__text">or</div>
                        </div>
                        <div className="login__form__item login__form__find login__right__find">
                            {/* <div className="login__form__item__title">
                                tài khoản
                            </div> */}
                            <input
                                type="text"
                                name="find"
                                id="find"
                                autoComplete="off"
                                aria-labelledby="placeholder-fname"
                                value={blogger}
                                onChange={(e) => setBlogger(e.target.value)}
                            />
                            <label
                                className="login__form__item__placeholder-text"
                                for="fname"
                                id="placeholder-fname"
                            >
                                <div className="login__form__item__text">
                                    Find a blogger
                                </div>
                            </label>
                        </div>
                        <div className="login__form__signup">
                            Don't have an account yet?
                            <span
                                className="login__form__signup__btn"
                                onClick={onPCSignupClick}
                            >
                                {' '}
                                Sign up.
                            </span>
                        </div>
                        <Link to="signup">
                            <div className="login__form__mobile-signup">
                                Sign up
                            </div>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
