import { Row, Spin } from "antd";
import React from "react";

function Loading(props) {
    return (
        <Row className="body" justify="center" align="middle">
            <div>
                <Spin size="large" />
            </div>
        </Row>
    );
}

export default Loading;
