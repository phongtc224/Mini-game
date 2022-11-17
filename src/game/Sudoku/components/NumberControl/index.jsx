import React from "react";
import PropTypes from "prop-types";
import { Row } from "antd";
import Item from "./Item";

NumberControl.propTypes = {
    listControl: PropTypes.array,
};

NumberControl.defaultProps = {
    listControl: [],
};

function NumberControl({ listControl }) {
    return (
        <Row justify="center" align="middle" className="number-control">
            {listControl.map((key, index) => {
                return <Item key={index} item={key} />;
            })}
        </Row>
    );
}

export default NumberControl;
