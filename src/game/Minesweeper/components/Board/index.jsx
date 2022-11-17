import React from "react";
import PropTypes from "prop-types";
import { Row } from "antd";
import Cell from "../Cell";

import "./Board.scss";

Board.propTypes = {
    size: PropTypes.number,
    cells: PropTypes.array,
    onClick: PropTypes.func,
};

Board.defaultProps = {
    size: 0,
    cells: [],
    onClick: null,
};

function Board({ grid, revealCell, updateFlag }) {
    return (
        <Row className="board-minesweeper" justify="center" align="middle">
            {grid.map((singleRow, index1) => {
                return (
                    <div key={index1}>
                        {singleRow.map((singleCol, index2) => {
                            return (
                                <Cell
                                    details={singleCol}
                                    key={index2}
                                    updateFlag={updateFlag}
                                    revealCell={revealCell}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </Row>
    );
}

export default Board;
