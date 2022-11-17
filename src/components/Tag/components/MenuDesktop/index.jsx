import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import MenuItemDesktop from "./MenuItem";
import "./MenuDesktop.scss";

MenuDesktop.propTypes = {
    listTag: PropTypes.array,
};

MenuDesktop.defaultProps = {
    listTag: [],
};

function MenuDesktop(props) {
    const { listTag } = props;
    return (
        <Row className="menu" justify="center">
            {listTag.map((element, index) => {
                return (
                    <Col span={18} key={index}>
                        <MenuItemDesktop item={element} />
                    </Col>
                );
            })}
        </Row>
    );
}

export default MenuDesktop;
