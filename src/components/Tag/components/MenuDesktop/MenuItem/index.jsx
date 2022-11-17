import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useRouteMatch } from "react-router";

MenuItemDesktop.propTypes = {
    item: PropTypes.object,
};

MenuItemDesktop.defaultProps = {
    item: null,
};

function MenuItemDesktop(props) {
    const { item } = props;
    const match = useRouteMatch();

    return (
        <NavLink
            activeClassName="active"
            className="menu-desktop__item"
            to={match.path + item.path}
        >
            <img
                src={item.icon}
                alt={item.content}
                className="menu-desktop__item--image"
            />
            <span className="menu-desktop__item--content">{item.content}</span>
        </NavLink>
    );
}

export default MenuItemDesktop;
