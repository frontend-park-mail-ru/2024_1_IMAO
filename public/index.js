'use strict';

import { Ajax } from "./modules/ajax.js";
import { MakeTree } from "./modules/makeTree.js";
import { CONFIG_HEADER, initHeaderConf} from "./components/header.js";
import { Login } from "./pages/login/login.js";
import { Signup } from "./pages/signup/signup.js";
import { ROUTES , locationResolver} from "./routes/routes.js";
import { renderAdsCardTamplate } from "./components/adsCard/adsCard.js";

const make = new MakeTree();
const ajax = new Ajax();

initHeaderConf(
    CONFIG_HEADER,
    {
        renderDefault, 
        renderLogin, 
        renderSignup, 
        renderMain,
    },
);

const rootElement = document.getElementById('root');
const headerElement = document.createElement('header');
const mainElement = document.createElement('main');

rootElement.appendChild(headerElement);
rootElement.appendChild(mainElement);

ROUTES.init('loginPage', renderLogin);
ROUTES.init('signupPage', renderSignup);
ROUTES.init('mainPage', renderMain);


function renderHeader(){
    make.makeTree(headerElement, mainElement, CONFIG_HEADER)
}

function renderDefault(){
    mainElement.innerHTML = '';
    const element = document.createElement('div');

    element.innerHTML = "страница пока не добавлена";

    return element;
}

function renderLogin(){
    mainElement.innerHTML = '';
    const form = document.createElement('div');
    const login = new Login(form);
    login.render();
    return form;
}

function renderSignup(){
    mainElement.innerHTML = '';
    const form = document.createElement('div');
    const signup = new Signup(form);
    signup.render();
    return form;
}

function renderMain(){
    mainElement.innerHTML = '';

    const element = document.createElement('div');

    element.innerHTML = "страница размещения объявления";

    ajax.get(
        ROUTES.main,
        (ads) => {
            const adverts = ads['adverts']
            if (adverts && Array.isArray(adverts)) {
              const div = document.createElement('div');
              element.appendChild(div);

              console.log(adverts);
    
              adverts.forEach((inner) => {
                console.log(inner);
                const {description, id, image, location, price, title, user_id} = inner;
                const block = document.createElement('div');
                block.style.display = 'inline-block';
                block.style.padding = '50px';
                block.innerHTML += renderAdsCardTamplate(title, price);
                div.appendChild(block);
              });
            }
        }
    )

    return element;
}

window.addEventListener('load', () => {
    const location = window.location.hash;

    if (location) {
        locationResolver(location, mainElement);
    }
});

renderHeader();
// mainElement.appendChild(renderMain());
