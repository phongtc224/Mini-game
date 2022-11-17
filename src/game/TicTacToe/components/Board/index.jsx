import React from "react";
import PropTypes from "prop-types";
import Cell from "../Cell";

import "./Board.scss";

BoardCell.propTypes = {
    cells: PropTypes.array,
    onClick: PropTypes.func,
    xIsNext: PropTypes.string,
};

BoardCell.defaultProps = {
    cells: [],
    onClick: null,
    xIsNext: "",
};

function BoardCell(props) {
    const { cells, onClick, xIsNext } = props;

    return (
        <div className={`board ${xIsNext}`}>
            {cells.map((cell, i) => (
                <Cell key={i} value={cell} onClick={() => onClick(i)} />
            ))}
        </div>
    );
}

export default BoardCell;
