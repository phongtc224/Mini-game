import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import ItemNav from "./Item";

import "./NavGame.scss";

NavGame.propTypes = {
    listNav: PropTypes.array,
    action: PropTypes.func,
};

NavGame.defaultProps = {
    listNav: [],
    action: null,
};

function NavGame({ listNav, action }) {
    return (
        <Row justify="center" className="nav-game">
            <Col span={20}>
                {listNav.map((key, index) => {
                    return <ItemNav item={key} key={index} action={action} />;
                })}
            </Col>
        </Row>
    );
}

export default NavGame;
