import React from "react";
import PropTypes from "prop-types";

import { CheckOutlined } from "@ant-design/icons";

ItemNav.propTypes = {
    item: PropTypes.object,
    action: PropTypes.func,
};

ItemNav.defaultProps = {
    item: null,
    action: null,
};

function ItemNav({ item, action }) {
    const widthScreen = window.innerWidth;

    return (
        <div>
            {widthScreen > 475 ? (
                <div className="nav-game__item" onClick={() => action(item.id)}>
                    {item.content}
                </div>
            ) : (
                <div className="nav-game__item" onClick={() => action(item.id)}>
                    <CheckOutlined />
                </div>
            )}
        </div>
    );
}

export default ItemNav;
