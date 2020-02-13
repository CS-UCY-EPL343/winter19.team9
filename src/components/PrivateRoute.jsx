import React               from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../repository';

const PrivateRoute = ({ component: Component, userLevel: UserLevel, ...rest }) => (
    <Route
        { ...rest }
        render = { props =>
            isAuthenticated() ? (
                <Component userLevel = { UserLevel } { ...props } />
            ) : (
                <Redirect to = { '/' } />
            )
        }
    />
);

export default PrivateRoute;
