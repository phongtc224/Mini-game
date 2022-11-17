import React from "react";
import PropTypes from "prop-types";
import { Col } from "antd";

Item.propTypes = {
    item: PropTypes.object,
};

Item.defaultProps = {
    item: null,
};

function Item({ item }) {
    return (
        <Col span={20} className="number-control__item">
            <span>{item.content}</span>
        </Col>
    );
}

export default Item;
