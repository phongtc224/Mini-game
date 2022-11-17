import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, Modal, Row } from "antd";
import Board from "../Board";
import { useHistory, useRouteMatch } from "react-router";

import { createBoard, revealed } from "../function";
import NavGame from "../NavGame";

Game.propTypes = {
    mineCount: PropTypes.number,
};

Game.defaultProps = {
    mineCount: 40,
};

function Game({ mineCount }) {
    const match = useRouteMatch();
    const router = useHistory();

    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocation, setMineLocation] = useState([]);

    const listNav = [
        { id: 1, key: "nonMines", content: `Non-Mines: ${nonMineCount}` },
    ];
    useEffect(() => {
        freshBoard();
    }, []);

    const freshBoard = () => {
        const newBoard = createBoard(12, 12, mineCount);
        setNonMineCount(12 * 12 - mineCount);
        setMineLocation(newBoard.mineLocation);
        setGrid(newBoard.board);
    };
    const updateFlag = (e, x, y) => {
        e.preventDefault();
        // deep copy of the object
        let newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[x][y].flagged = true;
        setGrid(newGrid);
    };

    const revealCell = (x, y) => {
        let newGrid = JSON.parse(JSON.stringify(grid));
        if (newGrid[x][y].value === "X") {
            error("Clicked on Mine ,Try Again");
            for (let i = 0; i < mineLocation.length; i++) {
                newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
            }
            setGrid(newGrid);
        }
        if (nonMineCount === 0) {
            success("You won");
        } else {
            let revealedBoard = revealed(newGrid, x, y, nonMineCount);
            setGrid(revealedBoard.arr);
            setNonMineCount(revealedBoard.newNonMines);
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
        const path = match.path.slice(0, match.path.lastIndexOf("/"));
        Modal.error({
            onOk: () => {
                Modal.destroyAll();
                router.push(path);
            },
            content: content,
        });
    };

    return (
        <Row justify="center" className="game-content">
            <Col md={18} xs={24}>
                <Board
                    grid={grid}
                    revealCell={revealCell}
                    updateFlag={updateFlag}
                />
            </Col>
            <Col md={6} xs={0}>
                <NavGame listNav={listNav} />
            </Col>
        </Row>
    );
}

export default Game;
