import React, { useState } from "react";
import { bestSpot, checkWin, endGame } from "../function";
import BoardCell from "../Board";

import { Col, Row, Modal } from "antd";
import { useHistory, useRouteMatch } from "react-router";

function OnePlayer(props) {
    const match = useRouteMatch();
    const router = useHistory();
    const huPlayer = "X";
    const aiPlayer = "O";

    const [origBoard, setOrigBoard] = useState(Array.from(Array(9).keys()));
    const [playerXNext, setPlayerXNext] = useState(true);

    const handleClick = (square) => {
        if (typeof origBoard[square] === "number") {
            turn(square, huPlayer);
            if (!checkWin(origBoard, huPlayer)) {
                turn(bestSpot(origBoard).index, aiPlayer);
            }
        }
    };

    const turn = (squareId, player) => {
        origBoard[squareId] = player;
        setPlayerXNext(!playerXNext);
        let win = checkWin(origBoard, player) || endGame(origBoard);

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

export default OnePlayer;
