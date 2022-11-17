import React from "react";
import { Col, Row } from "antd";
import { RedoOutlined } from "@ant-design/icons";

import "./Header.scss";
import { useRouteMatch } from "react-router";
import { ACTION, MENU } from "../../constants/global";
import { NavLink } from "react-router-dom";
import Clock from "../Clock";

const date = new Date();
date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);

function Header(props) {
    const match = useRouteMatch();

    const title = checkTitle(match.path) || "";
    const gameMode = checkGameMode(match.url) || "Normal";
    const pathRestart = match.path.slice(0, match.path.lastIndexOf("/"));

    return (
        <Row justify="space-between" className="header" align="middle">
            <Col md={10} xs={24}>
                <span className="header__title">Game {title}</span>
            </Col>
            <Col md={14} xs={24}>
                <Row align="middle">
                    <Col md={12} xs={24}>
                        <span className="header__game-mode">
                            Game mode: {gameMode}
                        </span>
                    </Col>
                    <Col md={4} xs={5}>
                        <NavLink
                            exact
                            className="header__btn-restart"
                            to={pathRestart}
                        >
                            <RedoOutlined />
                        </NavLink>
                    </Col>
                    <Col md={8} xs={16}>
                        <div className="header__clock">
                            <Clock date={date} />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

const checkTitle = (path) => {
    let response = "";
    const menu = MENU;

    menu.map((value) => {
        if (path.indexOf(value.path) !== -1) {
            response = value.content;
        }
    });

    return response;
};

const checkGameMode = (path) => {
    let response = "";
    const action = ACTION;

    action.map((value) => {
        if (path.indexOf(value.path) !== -1) {
            response = value.content;
        }
    });

    return response;
};

export default Header;
