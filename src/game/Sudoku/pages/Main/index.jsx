import React from "react";
import { Row } from "antd";
import ListAction from "../../../../components/ListAction";
import { ACTION_SDK } from "../../../../constants/global";

function Main() {
    return (
        <div>
            <Row justify="center">
                <span className="body-content__title">Game Sudoku</span>
            </Row>
            <ListAction listAction={ACTION_SDK} />
        </div>
    );
}

export default Main;
