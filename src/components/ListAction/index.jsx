import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import Item from "./Item";

import "./ListAction.scss";

ListAction.propTypes = {
    listAction: PropTypes.array,
};

ListAction.defaultProps = {
    listAction: [],
};

function ListAction(props) {
    const { listAction } = props;
    return (
        <Row justify="center">
            <Col md={6} xs={12} className="list-action">
                {listAction?.map((element, index) => {
                    return <Item item={element} key={index} />;
                })}
            </Col>
        </Row>
    );
}

export default ListAction;
