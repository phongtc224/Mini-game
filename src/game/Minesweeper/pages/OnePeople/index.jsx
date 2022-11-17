import React from "react";
import Header from "../../../../components/Header";
import Game from "../../components/Game";
import { useRouteMatch } from "react-router";

OnePeople.propTypes = {};

function OnePeople(props) {
    const match = useRouteMatch();
    const level = match.params.level;
    const mineCount = level * 5 + 15;

    return (
        <div>
            <Header />
            <Game mineCount={mineCount} />
        </div>
    );
}

export default OnePeople;
