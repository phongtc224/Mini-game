import React, { useState } from "react";
import { checkWin, endGame } from "../function";
import BoardCell from "../Board";

import { Col, Row, Modal } from "antd";
import { useHistory, useRouteMatch } from "react-router";

function TwoPlayer(props) {
    const match = useRouteMatch();
    const router = useHistory();

    const [origBoard, setOrigBoard] = useState(Array.from(Array(9).keys()));
    const [playerXNext, setPlayerXNext] = useState(true);
    const player = playerXNext ? "X" : "O";

    const handleClick = (square) => {
        origBoard[square] = player;
        setPlayerXNext(!playerXNext);
        const win = checkWin(origBoard, player) || endGame(origBoard);

        if (win) success(win.content);
    };
    const success = (content) => {
        const pathRestart = match.path.slice(0, match.path.lastIndexOf("/"));
        Modal.success({
            onOk: () => {
                Modal.destroyAll();
                router.push(pathRestart);
            },
            content: content,
        });
    };

    return (
        <Row className="game-content">
            <Col span={24}>
                <BoardCell cells={origBoard} onClick={handleClick} />
            </Col>
        </Row>
    );
}

export default TwoPlayer;
