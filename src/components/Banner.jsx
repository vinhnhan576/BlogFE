import React from "react";
import PropTypes from "prop-types";

const Banner = (props) => {

	return (
        <div className="banner">
            <div
                className={`banner__image ${props.quote ? 'overlay' : ''} `}
                style={{
                    width: `${Number(props.width)}%`,
                }}
            >
                <img
                    src={props.img}
                    alt=""
                    style={{
                        height: `${Number(props.height)}px`,
                    }}
                />
                <div className="banner__quote">{props.quote? '"' + props.quote + '"' : ''}</div>
            </div>
        </div>
    );
};

Banner.propTypes = {
	img: PropTypes.string.isRequired,
	width: PropTypes.string,
	height: PropTypes.string,
	quote: PropTypes.string,
};

export default Banner;
