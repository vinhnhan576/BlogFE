import React from "react";
import { useNavigate } from "react-router-dom";

function DropdownMenu(props) {
	function DropdownItem(props) {
		const navigate = useNavigate();
		const dropdownItemClick = (e) => {
			e.preventDefault();
			navigate(`/${props.bloggerAlias}/topic/${props.slug}`);
		};
		return (
			<div className="dropdown__item" onClick={dropdownItemClick}>
				<span className="dropdown__item__icon-button">{props.leftIcon}</span>
				<p>{props.children}</p>
				<span className="dropdown__item__icon-right">{props.rightIcon}</span>
			</div>
		);
	}

	return (
		<div className="dropdown">
			{props.blogger.Topic.map((topic, index) => {
				return (
					<DropdownItem
						key={index}
						slug={topic.slug}
						bloggerAlias={props.blogger.alias}>
						{topic.topicName}
					</DropdownItem>
				);
			})}
		</div>
	);
}

export default DropdownMenu;
