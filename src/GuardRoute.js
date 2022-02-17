import React from 'react';
import { Route, Redirect } from "react-router-dom";

/**
 * Wrapper component for react router that provide route guard
 * 
 * @param {Component} Component 
 * @param {boolean} auth
 * @param {object} rest
 */

const GuardedRoute = ({ component: Component, auth, redirectTo = "/login", ...rest }) => {
    return <Route {...rest} render={(props) => (
        auth
            ? 
            <Component {...props} />
            : <Redirect to={redirectTo} />
    )} />
}

export default GuardedRoute;