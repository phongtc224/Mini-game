import React from "react";
import PropTypes from "prop-types";

Cell.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    status: PropTypes.string,
};

Cell.defaultProps = {
    value: "",
    onClick: null,
    status: "",
};

function Cell(props) {
    const { value, status, onClick, position, cellFocus, onChangeBoard } =
        props;
    const style =
        cellFocus === position
            ? `board-sudoku__cell focus`
            : `board-sudoku__cell ${status}`;

    const handleClick = (position) => {
        onClick(position);
    };

    const handleBlur = (e) => {
        const response = e.target.value;
        if (response) {
            onChangeBoard({ value: response, position: position });
        }
    };

    return (
        <div>
            {position === cellFocus ? (
                <input
                    type="text"
                    className={style}
                    onBlur={(e) => handleBlur(e)}
                    autoFocus
                />
            ) : (
                <div className={style} onClick={() => handleClick(position)}>
                    {value}
                </div>
            )}
        </div>
    );
}

export default Cell;
