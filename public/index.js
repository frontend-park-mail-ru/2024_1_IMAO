'use strict';

import {ROUTES, locationResolver} from './routes/routes.js';
import {Main} from './pages/main/main.js';
import {Login} from './pages/login/login.js';
import {Signup} from './pages/signup/signup.js';

const rootElement = document.getElementById('root');
const mainElement = document.createElement('main');

rootElement.appendChild(mainElement);

ROUTES.init('loginPage', renderLogin);
ROUTES.init('signupPage', renderSignup);
ROUTES.init('mainPage', renderMain);

/**
 * Return login page.
 * @return {HTMLElement} - The login page.
 */
function renderLogin() {
  mainElement.innerHTML = '';
  const login = new Login();
  return login.render(); ;
}

/**
 * Return signup page.
 * @return {HTMLElement} - The signup page.
 */
function renderSignup() {
  mainElement.innerHTML = '';
  const signup = new Signup();
  return signup.render(); ;
}

/**
 * Return main page.
 * @return {HTMLElement} - The main page.
 */
function renderMain() {
  mainElement.innerHTML = '';
  const main = new Main();
  return main.render();
}

/**
 * Changing page via url.
 * @param {HTMLElement} container - The container to render.
 */
function changePage(container) {
  const location = window.location.hash;

  if (location) {
    locationResolver(location, container);
  }
};

window.addEventListener('popstate', () => changePage(mainElement));
window.addEventListener('load', () => changePage(mainElement));

if (window.location.hash === '' ) {
  locationResolver(ROUTES.mainPage.href, mainElement);
}
