import { Col, Row } from "antd";
import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import Tag from "../components/Tag";
import NotFound from "../components/NotFound";

import TicTacToeGame from "./TicTacToe";
import SudokuGame from "./Sudoku";
import MinesweeperGame from "./Minesweeper";

function Game(props) {
    const match = useRouteMatch();
    return (
        <Row>
            <Col md={6} xs={24} className="tag">
                <Tag />
            </Col>
            <Col md={18} xs={24} className="body">
                <Switch>
                    <Redirect
                        exact
                        from={match.url}
                        to={`${match.url}/tic-tac-toe`}
                    ></Redirect>
                    <Route
                        path={`${match.url}/tic-tac-toe`}
                        component={TicTacToeGame}
                    />
                    <Route
                        path={`${match.url}/sudoku`}
                        component={SudokuGame}
                    />
                    <Route
                        path={`${match.url}/minesweeper`}
                        component={MinesweeperGame}
                    />
                    <Route component={NotFound} />
                </Switch>
            </Col>
        </Row>
    );
}

export default Game;
