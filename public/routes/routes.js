'use strict';

export const ROUTES = {
    main: '/',
    login: '/login',
    signup: '/signup',
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
}

export function locationResolver(href, parant){
    Object.entries(ROUTES).forEach(([_, route]) => {
        const location = route?.href;
        if(location == href){
            parant.appendChild(route.render());
        }
    })
}