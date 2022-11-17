import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
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

function Board({ cells, onChangeBoard }) {
    const [cellFocus, setCellFocus] = useState(null);
    const onClick = (value) => {
        if (value !== undefined) {
            setCellFocus(value);
        }
    };

    return (
        <Row className="board-sudoku" justify="center" align="middle">
            {cells.map((key, index) => {
                return key.map((cell, position) => {
                    return (
                        <Col className="col-cell-sudoku">
                            {cell.prefilled && (
                                <Cell
                                    key={position}
                                    value={cell.value}
                                    status={"disabled"}
                                    onClick={onClick}
                                    cellFocus={cellFocus}
                                />
                            )}

                            {cell.prefilled === false &&
                                cell.value !== null && (
                                    <Cell
                                        key={position}
                                        onClick={onClick}
                                        value={cell.value}
                                        position={position + index * 9}
                                        cellFocus={cellFocus}
                                        onChangeBoard={onChangeBoard}
                                    />
                                )}
                            {cell.prefilled === false &&
                                cell.value === null && (
                                    <Cell
                                        key={position}
                                        onClick={onClick}
                                        position={position + index * 9}
                                        cellFocus={cellFocus}
                                        onChangeBoard={onChangeBoard}
                                    />
                                )}
                        </Col>
                    );
                });
            })}
        </Row>
    );
}

export default Board;
