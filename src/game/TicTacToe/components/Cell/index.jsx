import React from "react";
import PropTypes from "prop-types";

Cell.propTypes = {
    onClick: PropTypes.func,
};

Cell.defaultProps = {
    onClick: null,
};

function Cell(props) {
    const { value, onClick } = props;
    const style = value ? `cell ${value}` : `cell`;
    return <div className={style} onClick={onClick}></div>;
}

export default Cell;
