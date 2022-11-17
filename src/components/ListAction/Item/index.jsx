import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useRouteMatch } from "react-router";

Item.propTypes = {
    item: PropTypes.object,
};

Item.defaultProps = {
    item: null,
};

function Item(props) {
    const { item } = props;
    const match = useRouteMatch();
    const path = match.path.replace("/start", item.path);

    return (
        <NavLink
            exact
            activeClassName="active"
            className="list-action__item"
            to={path}
        >
            <span className="list-action__item--content">{item.content}</span>
        </NavLink>
    );
}

export default Item;
