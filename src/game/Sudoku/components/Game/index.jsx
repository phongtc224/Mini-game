import React, { useState } from "react";
import PropTypes from "prop-types";
import { NAV_SDK } from "../../../../constants/global";
import { Col, Modal, Row } from "antd";
import NavGame from "../NavGame";
import Board from "../Board";
import { useHistory, useRouteMatch } from "react-router";
import { makeBoard, makePuzzle, pluck } from "../function";

Game.propTypes = {
    finalCount: PropTypes.number,
};

Game.defaultProps = {
    finalCount: 40,
};

function Game({ finalCount }) {
    const match = useRouteMatch();
    const router = useHistory();

    const solutionDefault = makePuzzle();
    const [solution, setSolution] = useState([...solutionDefault] || null);
    const { puzzle } = pluck(solution, finalCount);
    const boardDefault = makeBoard({ puzzle });
    const [boardGame, setBoardGame] = useState([...boardDefault] || null);

    const listNav = NAV_SDK;

    const onChangeBoard = (value) => {
        const positionRow = Math.floor(value.position / 9);
        const positionCol = value.position % 9;
        const boardChange = [...boardGame];
        boardChange[positionRow][positionCol] = {
            value: Number(value.value),
            prefilled: false,
        };

        setBoardGame(boardChange);
    };

    const navAction = (value) => {
        console.log(match);
        if (value === 1) {
            verifyGame(solution, boardGame)
                ? success("Congratulation, restart game ?")
                : error("Something wrong, please try again!");
        }
    };

    const success = (content) => {
        const path = match.path.slice(0, match.path.lastIndexOf("/"));
        Modal.success({
            onOk: () => {
                Modal.destroyAll();
                router.push(path);
            },
            content: content,
        });
    };

    const error = (content) => {
        Modal.error({
            content: content,
        });
    };

    return (
        <Row justify="center" className="game-content">
            <Col md={18} xs={24}>
                <Board cells={boardGame} onChangeBoard={onChangeBoard} />
            </Col>
            <Col md={6}>
                <NavGame listNav={listNav} action={navAction} />
            </Col>
        </Row>
    );
}

const verifyGame = (solution, boardGame) => {
    let response = true;
    boardGame.map((cell, row) => {
        return cell.map((item, col) => {
            if (item.value !== solution[row][col]) {
                response = false;
            }
        });
    });

    return response;
};

export default Game;
