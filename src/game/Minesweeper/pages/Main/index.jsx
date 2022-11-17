import React from "react";
import { Row } from "antd";
import ListAction from "../../../../components/ListAction";
import { ACTION_MS } from "../../../../constants/global";

function Main(props) {
    return (
        <div>
            <Row justify="center">
                <span className="body-content__title">Game Minesweeper</span>
            </Row>
            <ListAction listAction={ACTION_MS} />
        </div>
    );
}

export default Main;
