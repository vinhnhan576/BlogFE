import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createNewAccountAsync } from '../features/account/accountSlice';
import { useNavigate } from 'react-router-dom';

import loginImage01 from '../assets/image/login/login-image-01.png';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialAccountState = {
        name: '',
        alias: '',
        gender: true,
        date: '2023-01-01',
        tel: '',
        job: '',
        address: '',
        email: '',
        profilepic: '',
        upperpic: '',
        lowerpic: '',
        username: '',
        password: '',
    };

    const [fullName, setFullName] = useState({ firstName: '', surName: '' });

    const [account, setAccount] = useState(initialAccountState);

    const handleChange = (input) => (event) => {
        setAccount({ ...account, [input]: event.target.value });
    };

    const handleNameChange = (input) => (event) => {
        fullName[input] = event.target.value;
        account.name = fullName.surName + ' ' + fullName.firstName;
        // setAccount({
        // 	...account,
        // 	name: fullName.surName + " " + fullName.firstName,
        // });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log('registering...');
        setAccount({ ...account, date: new Date(account.date) });
        await dispatch(createNewAccountAsync({ account }));
        navigate('/');
    };

    return (
        <div className="login">
            <div className="login__image signup">
                <img src={loginImage01} alt="" />
            </div>
            {/* <div className="login__image login__image__after signup">
				<img src={loginImage02} alt="" />
			</div> */}
            <form className="login__form" onSubmit={handleSignUp}>
                <div className="login__form__item">
                    <div className="login__form__item__whole__small__title">
                        <div className="login__form__item__small__title">
                            <div className="login__form__item__title"> H???</div>
                            <input
                                type="text"
                                name="surName"
                                id="surName"
                                onChange={handleNameChange('surName')}
                                // placeholder={"C???m".toString()}
                            />
                        </div>
                        <div className="login__form__item__small__title">
                            <div className="login__form__item__title"> T??n</div>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                onChange={handleNameChange('firstName')}
                                // placeholder={"S???c".toString()}
                            />
                        </div>
                    </div>
                </div>
                <div className="login__form__item">
                    <input
                        type="text"
                        name="alias"
                        id="alias"
                        onChange={handleChange('alias')}
						value={account.alias}
                        // placeholder={"huongleehere".toString()}
                    />
                    <label
                        className="login__form__item__placeholder-text"
                        for="fname"
                        id="placeholder-fname"
                    >
                        <div className="login__form__item__text">Alias</div>
                    </label>
                </div>
                <div className="login__form__item">
                    <div className="login__form__item__title">
                        T??n t??i kho???n
                    </div>
                    <input
                        type="text"
                        name="username"
                        id="username-signup"
                        onChange={handleChange('username')}
                        // placeholder={"huongleehere".toString()}
                    />
                </div>
                <div className="login__form__item">
                    <div className="login__form__item__title">M???t kh???u</div>
                    <input
                        type="password"
                        name="password"
                        id="password-signup"
                        onChange={handleChange('password')}
                        // placeholder={"Abc_123456".toString()}
                    />
                </div>
                <div className="login__form__item">
                    <div className="login__form__item__title">Email</div>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={handleChange('email')}
                        // placeholder={"Bloggit@gmail.com".toString()}
                    />
                </div>
                {/* <div className="login__form__item">
					<div className="login__form__item__title">S??? ??i???n tho???i </div>
					<input
						type="text"
						name="tel"
						id="tel"
						onChange={handleChange("tel")}
						placeholder={"0123456789".toString()}
					/>
				</div> */}
                {/* <div className="login__form__item">
					<div className="login__form__item__title">Ng??y sinh </div>
					<input
						type="text"
						name="date"
						id="date"
						onChange={handleChange("date")}
						// placeholder="02/11/2002"
					/>
				</div> */}
                {/* <div className="login__form__item">
					<div className="login__form__item__title">?????a ch??? </div>
					<input
						type="text"
						name="location"
						id="location"
						onChange={handleChange("location")}
						placeholder={"ex: Th???y Ph????ng, H????ng Th???y".toString()}
					/>
				</div> */}
                {/* <div className="login__form__item">
					<div className="login__form__item__title"> Ngh??? nghi???p </div>
					<input
						type="text"
						name="job"
						id="job"
						onChange={handleChange("job")}
						placeholder={"M?? thi??n h???".toString()}
					/>
				</div> */}
                <button type="submit" className="login__form__button">
                    ????ng k??
                </button>
            </form>
        </div>
    );
};

export default Signup;
