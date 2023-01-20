import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createNewAccountAsync } from "../features/account/accountSlice";
import { useNavigate } from "react-router-dom";

import loginImage01 from "../assets/image/login/login-image-01.png";

const Signup = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initialAccountState = {
		name: "",
		alias: "",
		gender: true,
		date: "",
		tel: "",
		job: "",
		address: "",
		email: "",
		profilepic: "",
		upperpic: "",
		lowerpic: "",
		username: "",
		password: "",
	};

	const [fullName, setFullName] = useState({ firstName: "", surName: "" });

	const [account, setAccount] = useState(initialAccountState);

	const handleChange = (input) => (event) => {
		setAccount({ ...account, [input]: event.target.value });
	};

	const handleNameChange = (input) => (event) => {
		fullName[input] = event.target.value;
		account.name = fullName.surName + " " + fullName.firstName;
		// setAccount({
		// 	...account,
		// 	name: fullName.surName + " " + fullName.firstName,
		// });
	};

	const handleSignUp = (e) => {
		e.preventDefault();
		console.log("form submitted");
		setAccount({ ...account, date: new Date(account.date) });
		dispatch(createNewAccountAsync({ account }));
		navigate("/");
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
							<div className="login__form__item__title"> Họ</div>
							<input
								type="text"
								name="surName"
								id="surName"
								onChange={handleNameChange("surName")}
								// placeholder={"Cẩm".toString()}
							/>
						</div>
						<div className="login__form__item__small__title">
							<div className="login__form__item__title"> Tên</div>
							<input
								type="text"
								name="firstName"
								id="firstName"
								onChange={handleNameChange("firstName")}
								// placeholder={"Sục".toString()}
							/>
						</div>
					</div>
				</div>
				<div className="login__form__item">
					<div className="login__form__item__title">Biệt danh</div>
					<input
						type="text"
						name="alias"
						id="alias"
						onChange={handleChange("alias")}
						// placeholder={"huongleehere".toString()}
					/>
				</div>
				<div className="login__form__item">
					<div className="login__form__item__title">Tên tài khoản</div>
					<input
						type="text"
						name="username"
						id="username-signup"
						onChange={handleChange("username")}
						// placeholder={"huongleehere".toString()}
					/>
				</div>
				<div className="login__form__item">
					<div className="login__form__item__title">Mật khẩu</div>
					<input
						type="password"
						name="password"
						id="password-signup"
						onChange={handleChange("password")}
						// placeholder={"Abc_123456".toString()}
					/>
				</div>
				<div className="login__form__item">
					<div className="login__form__item__title">Email</div>
					<input
						type="text"
						name="email"
						id="email"
						onChange={handleChange("email")}
						// placeholder={"Bloggit@gmail.com".toString()}
					/>
				</div>
				{/* <div className="login__form__item">
					<div className="login__form__item__title">Số điện thoại </div>
					<input
						type="text"
						name="tel"
						id="tel"
						onChange={handleChange("tel")}
						placeholder={"0123456789".toString()}
					/>
				</div> */}
				<div className="login__form__item">
					<div className="login__form__item__title">Ngày sinh </div>
					<input
						type="text"
						name="date"
						id="date"
						onChange={handleChange("date")}
						// placeholder="02/11/2002"
					/>
				</div>
				{/* <div className="login__form__item">
					<div className="login__form__item__title">Địa chỉ </div>
					<input
						type="text"
						name="location"
						id="location"
						onChange={handleChange("location")}
						placeholder={"ex: Thủy Phương, Hương Thủy".toString()}
					/>
				</div> */}
				{/* <div className="login__form__item">
					<div className="login__form__item__title"> Nghề nghiệp </div>
					<input
						type="text"
						name="job"
						id="job"
						onChange={handleChange("job")}
						placeholder={"Má thiên hạ".toString()}
					/>
				</div> */}
				<button type="submit" className="login__form__button">
					Đăng ký
				</button>
			</form>
		</div>
	);
};

export default Signup;
