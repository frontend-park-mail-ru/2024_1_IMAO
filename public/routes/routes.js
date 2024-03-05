'use strict';

import { Header } from "../components/header/header.js";
import { Ajax } from "../modules/ajax.js";

const ajax = new Ajax();

export const ROUTES = {
    main: '/',
    login: '/login',
    logout: '/logout',
    signup: '/signup',
    checkAuth: '/check_auth',
    mainPage: {
        href: '#/',
    },
    loginPage:{
        href: '#/login',
    }, 
    signupPage: {
        href: '#/signup',
    },
    init: (route, render) => {
        ROUTES[route].render = render;
    },
    render: (route) => {
        ROUTES?.[route]?.render?.();
    }
};

export const auth = {
    is_auth: false,
};

const logoutPages = [ROUTES.loginPage.href, ROUTES.signupPage.href];

const logoutRequired = (href) => {
    console.log(logoutPages.includes(href))
    console.log(auth.is_auth === true)
    console.log(auth)
    if (logoutPages.includes(href) && auth.is_auth === true){
        console.log('ffdfdffd');
        const main = document.getElementsByTagName('main')[0];
        locationResolver(ROUTES.mainPage.href, main);
        return true;
    }
    return false;
}

const checkAuth = () => {
    ajax.get(
        ROUTES.checkAuth,
        (body) => {
            if (body.isAuth === auth.is_auth){
                return;
            }
            auth.is_auth = body.isAuth;
            const headerElement = document.getElementsByTagName('header')[0];
            const header = new Header(headerElement);
            header.render();
            
        }
    )
}

export function locationResolver(href, parant){
    checkAuth();
    if (logoutRequired(href)){
        return;
    }
    Object.entries(ROUTES).forEach(([_, route]) => {
        const location = route?.href;
        if(location == href){
            window.location.hash = location;
            parant.appendChild(route.render());
        };
    });
};