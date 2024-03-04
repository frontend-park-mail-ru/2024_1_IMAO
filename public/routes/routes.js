'use script'

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
    Object.entries(ROUTES).forEach((el) => {
        const location = el[1]?.href;
        console.log(location);
        if(location == href){
            parant.appendChild(el[1].render());
        }
    })
}