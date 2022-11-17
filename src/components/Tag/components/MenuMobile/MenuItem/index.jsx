import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useRouteMatch } from "react-router";

MenuItemMobile.propTypes = {
    item: PropTypes.object,
    onClose: PropTypes.func,
};

MenuItemMobile.defaultProps = {
    item: null,
    onClose: null,
};

function MenuItemMobile(props) {
    const { item, onClose } = props;
    const match = useRouteMatch();

    return (
        <NavLink
            activeClassName="active"
            className="menu-mobile__item"
            to={match.path + item.path}
            onClick={onClose}
        >
            <img
                src={item.icon}
                alt={item.content}
                className="menu-mobile__item--image"
            />
            <span className="menu-mobile__item--content">{item.content}</span>
        </NavLink>
    );
}

export default MenuItemMobile;
