import React from "react";
import Header from "../../../../components/Header";
import Game from "../../components/Game";
import { useRouteMatch } from "react-router";

OnePeople.propTypes = {};

function OnePeople(props) {
    const match = useRouteMatch();
    const level = match.params.level;
    const finalCount = 55 - level * 10;

    return (
        <div>
            <Header />
            <Game finalCount={finalCount} />
        </div>
    );
}

export default OnePeople;
