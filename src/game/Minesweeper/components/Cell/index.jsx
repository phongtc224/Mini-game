import React from "react";
import PropTypes from "prop-types";

import { FlagOutlined, FrownOutlined } from "@ant-design/icons";

Cell.propTypes = {
    details: PropTypes.string,
    updateFlag: PropTypes.func,
    revealCell: PropTypes.string,
};

Cell.defaultProps = {
    details: "",
    updateFlag: null,
    revealCell: "",
};

function Cell({ details, updateFlag, revealCell }) {
    const click = () => {
        revealCell(details.x, details.y);
    };
    const style =
        details.revealed && details.value !== 0
            ? details.value === "X"
                ? "board-minesweeper__cell mine"
                : "board-minesweeper__cell active"
            : details.revealed && details.value === 0
            ? "board-minesweeper__cell active"
            : "board-minesweeper__cell";

    const rightClick = (e) => {
        updateFlag(e, details.x, details.y);
    };
    return (
        <div className={style} onClick={click} onContextMenu={rightClick}>
            {!details.revealed && details.flagged ? (
                <FlagOutlined />
            ) : details.revealed && details.value !== 0 ? (
                details.value === "X" ? (
                    <FrownOutlined />
                ) : (
                    details.value
                )
            ) : (
                ""
            )}
        </div>
    );
}

export default Cell;
