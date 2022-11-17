import { Col, Row } from "antd";
import React from "react";

function Logo(props) {
    return (
        <Row justify="center" className="tag__logo">
            <Col xs={24} md={22} className="tag__logo--content">
                <span>Minigame</span>
            </Col>
        </Row>
    );
}

export default Logo;
