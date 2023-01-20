import React from "react";
import Helmet from "../components/Helmet";
import user from "../assets/image/user/alt.png";
import { useSelector } from "react-redux";

function About() {
	
    // const user = useSelector((state) => state.user);
    const blogger = useSelector((state) => state.blogger);
	return (
        <Helmet title="Tớ là?">
            <div className="bigwhole">
                <div className="bigwhole__whole">
                    <div className="bigwhole__whole__whole1">
                        <div className="bigwhole__whole__whole1__image">
                            {blogger.upperpic ? (
                                <img
                                    src={
                                        'data:image/jpg;base64,' +
                                        blogger.upperpic.toString('base64')
                                    }
                                    alt=""
                                ></img>
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
                            <p className="about-welcome">
                                Chào mừng cậu đến với blog của tớ
                            </p>
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
