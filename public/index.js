'use strict';

import { ROUTES , locationResolver} from "./routes/routes.js";
import { Ajax } from "./modules/ajax.js";
import { Header } from "./components/header/header.js";
import { Main } from "./pages/main/main.js";
import { Login } from "./pages/login/login.js";
import { Signup } from "./pages/signup/signup.js";

const ajax = new Ajax();

const rootElement = document.getElementById('root');
const headerElement = document.createElement('header');
const mainElement = document.createElement('main');

rootElement.appendChild(headerElement);
rootElement.appendChild(mainElement);

ROUTES.init('loginPage', renderLogin);
ROUTES.init('signupPage', renderSignup);
ROUTES.init('mainPage', renderMain);

/**
 * Return login page.
 * @returns {HTMLElement} - The login page.
 */
function renderLogin(){
    mainElement.innerHTML = '';
    const page = document.createElement('div');
    const login = new Login(page);
    login.render();
    return page;
}

/**
 * Return signup page.
 * @returns {HTMLElement} - The signup page.
 */
function renderSignup(){
    mainElement.innerHTML = '';
    const page = document.createElement('div');
    const signup = new Signup(page);
    signup.render();
    return page;
}

/**
 * Return main page.
 * @returns {HTMLElement} - The main page.
 */
function renderMain(){
    mainElement.innerHTML = '';
    const page = document.createElement('div');
    const main = new Main(page);
    main.render();
    return page;
}

window.addEventListener('load', () => {
    const location = window.location.hash;

    if (location) {
        locationResolver(location, mainElement);
    }
});

const header = new Header(headerElement);
header.render();
if(window.location.hash === '' ) {
    locationResolver(ROUTES.mainPage.href, mainElement);
}
