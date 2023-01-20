import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/account/accountSlice';

function SettingsMenu(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutClick = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate(`/`);
    };

    const settingsClick = (e) => {
        e.preventDefault();
        navigate('/' + props.alias + '/settings');
    };

    return (
        <div className="dropdown settings">
            <DropdownItem bloggerAlias={props.alias} func={settingsClick}>
                {props.settings[0].name}
            </DropdownItem>
            <DropdownItem bloggerAlias={props.alias} func={logoutClick}>
                {props.settings[1].name}
            </DropdownItem>
        </div>
    );

    function DropdownItem(props) {
        return (
            <div className="dropdown__item settings" onClick={props.func}>
                <span className="dropdown__item__icon-button settings">
                    {props.leftIcon}
                </span>
                <p>{props.children}</p>
                <span className="dropdown__item__icon-right settings">
                    {props.rightIcon}
                </span>
            </div>
        );
    }
}

export default SettingsMenu;
