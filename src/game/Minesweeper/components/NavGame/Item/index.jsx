import React from "react";
import PropTypes from "prop-types";

ItemNav.propTypes = {
    item: PropTypes.object,
    action: PropTypes.func,
};

ItemNav.defaultProps = {
    item: null,
    action: null,
};

function ItemNav({ item, action }) {
    return (
        <div className="nav-game__item" onClick={() => action(item.id)}>
            {item.content}
        </div>
    );
}

export default ItemNav;
