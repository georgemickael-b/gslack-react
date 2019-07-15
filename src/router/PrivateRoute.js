import { Route, Redirect } from "react-router-dom";
import React from "react";
import AuthContainer from "../containers/auth.container";

function PrivateRoute({ component: Component, ...rest }) {
    let authContainer = AuthContainer.useContainer()
    let authed = !!authContainer.auth
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}

export default PrivateRoute