import { Row, Spin } from "antd";
import NotFound from "./components/NotFound";
import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import "./App.scss";
const game = React.lazy(() => import("./game"));

function App() {
    return (
        <div className="mini-game">
            <Suspense
                fallback={
                    <Row className="body" justify="center" align="middle">
                        <div>
                            <Spin size="large" tip="Loading..." />
                        </div>
                    </Row>
                }
            >
                <BrowserRouter>
                    <Switch>
                        <Redirect exact from="/" to="/game"></Redirect>
                        <Route path="/game" component={game} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </div>
    );
}

export default App;
