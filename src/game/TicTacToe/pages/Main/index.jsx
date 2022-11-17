import React from "react";
import { Row } from "antd";
import ListAction from "../../../../components/ListAction";
import { ACTION_TTT } from "../../../../constants/global";

function Main(props) {
    return (
        <div>
            <Row justify="center">
                <span className="body-content__title">Game Tic Tac Toe</span>
            </Row>
            <ListAction listAction={ACTION_TTT} />
        </div>
    );
}

export default Main;
