import React from "react";
import { Redirect, useLocation } from 'react-router-dom';
import AxiosService from './axios';
import { keyToken } from './variables';

export const getToken = () => AxiosService.getToken();
export const setToken = (value) => AxiosService.setToken(value);

export const Middleware = (Component, props) => {
    const loc = useLocation();
    return AxiosService.isAuthenticated() ? <Component /> : <Redirect to={{ pathname: "/login", state: { referrer: loc.pathname } }} />
}

export const getUserId = () => {
    return AxiosService.getIdToken();
}

export const closeSession = () => {
    AxiosService.closeSession();
    window.location.href = "/";
}

