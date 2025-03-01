// import jwt_decode from "jwt-decode";
import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { keyToken } from './variables'
import jwt_decode from "./jwt"


export const grantPermission = (requestedRoles = []) => {
    if (requestedRoles.length > 0) {
        if (requestedRoles.includes(jwt_decode(window.localStorage.getItem(keyToken)).user.rol)) return true;
        else return false;
    } else return true;
};

export const UnlockAccess = ({ children, request }) => <>{grantPermission(request) && children}</>;
export const RoleBasedRouting = ({ component: Component, roles, redirect = '/', ...rest }) => grantPermission(roles) ? <Route {...rest} render={(props) => <Component {...props} />} /> : <Route render={() => <Redirect to={redirect} />} />;