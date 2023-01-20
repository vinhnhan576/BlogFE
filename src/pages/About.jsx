import React from "react";
import Helmet from "../components/Helmet";
import user from "../assets/image/user/alt.png";

function About({ blogger }) {
	return (
		<Helmet title="Tớ là?">
			<div className="bigwhole">
				<div className="bigwhole__whole">
					<div className="bigwhole__whole__whole1">
						<div className="bigwhole__whole__whole1__image">
							{blogger?.upperpic ? (
								<img src={blogger.upperpic} alt=""></img>
							) : (
								<img src={user} alt="" />
							)}
						</div>
						<div className="bigwhole__whole__whole1__outline bigwhole__whole__outline"></div>
					</div>
					<div className="bigwhole__whole__whole2">
						<div className="bigwhole__whole__whole2__greeting">
							<p className="about-greetings">Xin chàooo,</p>
							<p className="about-name">Tớ là {blogger.name}</p>
							<p className="about-welcome">Chào mừng cậu đến với blog của tớ</p>
						</div>
						<div className="bigwhole__whole__whole2__outline bigwhole__whole__outline"></div>
					</div>
				</div>
				{/* <div className="bigwhole__icon">
					<img src={Icon} alt="" />
				</div>
				<div className="bigwhole__pic">
					<img src={Hello2} alt="" />
				</div>
				<div className="bigwhole__intro">Giới thiệu bản thân</div>
				<div className="bigwhole__concept">
				</div>
				<div className="bigwhole__sign">
					<img src={Sign} alt="" />
				</div> */}
			</div>
		</Helmet>
	);
}

export default About;
