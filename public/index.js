'use strict';

import { Ajax } from "./modules/ajax.js";
import { MakeTree } from "./modules/makeTree.js";
import { Login } from "./pages/login/login.js";
import { Signup } from "./pages/signup/signup.js";
import { ROUTES , locationResolver} from "./routes/routes.js";
import { Main } from "./pages/main/main.js";
import { Header } from "./components/header/header.js";

const make = new MakeTree();
const ajax = new Ajax();

const rootElement = document.getElementById('root');
const headerElement = document.createElement('header');
const mainElement = document.createElement('main');

rootElement.appendChild(headerElement);
rootElement.appendChild(mainElement);

ROUTES.init('loginPage', renderLogin);
ROUTES.init('signupPage', renderSignup);
ROUTES.init('mainPage', renderMain);

function renderLogin(){
    mainElement.innerHTML = '';
    const page = document.createElement('div');
    const login = new Login(page);
    login.render();
    return page;
}

function renderSignup(){
    mainElement.innerHTML = '';
    const page = document.createElement('div');
    const signup = new Signup(page);
    signup.render();
    return page;
}

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
// mainElement.appendChild(renderMain());
