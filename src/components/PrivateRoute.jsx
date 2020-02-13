import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../repository";
import history             from '../history';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: localStorage.getItem('path'), state: { from: history } }}
                />
            )
        }
    />
);

export default PrivateRoute;
