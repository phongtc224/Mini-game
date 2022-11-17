import React, {  } from "react";
import PropTypes from "prop-types";

import "./Tag.scss";
import { MENU } from "../../constants/global";
import Logo from "./components/Logo";
import MenuDesktop from "./components/MenuDesktop";
import MenuMobile from "./components/MenuMobile";

Tag.propTypes = {
    listTag: PropTypes.array,
};
Tag.defaultProps = {
    listTag: [],
};

function Tag(props) {
    const widthScreen = window.innerWidth;
    return (
        <div className="tag-content">
            <Logo />
            {widthScreen > 475 ? (
                <MenuDesktop listTag={MENU} />
            ) : (
                <MenuMobile listTag={MENU} />
            )}
        </div>
    );
}

export default Tag;
