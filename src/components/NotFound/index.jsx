import { Col, Row } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

import "./NotFound.scss";

function NotFound(props) {
    return (
        <Row align="bottom" justify="center" className="page-error">
            <Col md={12} xs={24}>
                <Row justify="center">
                    <span className="page-error__title">404</span>
                </Row>
                <Row justify="center">
                    <span className="page-error__content">
                        The page you are looking for does not exist
                    </span>
                </Row>
                <Row justify="center">
                    <NavLink exact className="page-error__btn" to={"/"}>
                        GO BACK HOME
                    </NavLink>
                </Row>
            </Col>
        </Row>
    );
}

NotFound.propTypes = {};

export default NotFound;
