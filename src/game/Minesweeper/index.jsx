import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import NotFound from "../../components/NotFound";
import Main from "./pages/Main";
import OnePeople from "./pages/OnePeople";

Minesweeper.propTypes = {};

function Minesweeper(props) {
    const match = useRouteMatch();

    return (
        <div className="body-content">
            <Switch>
                <Redirect
                    exact
                    from={match.url}
                    to={`${match.url}/start`}
                ></Redirect>
                <Route exact path={`${match.url}/start`} component={Main} />
                <Route
                    exact
                    path={`${match.url}/:level`}
                    component={OnePeople}
                />

                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default Minesweeper;
