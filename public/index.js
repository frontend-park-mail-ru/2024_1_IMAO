'use strict';

import {API_ROUTES, PAGES_ROUTES, AUTH, serverHost} from './config/config.js';
import {Header} from './components/header/header.js';
import {Main} from './pages/main/main.js';
import {Login} from './pages/login/login.js';
import {Signup} from './pages/signup/signup.js';
import {Advert} from './pages/advert/advert.js';
import ajax from './modules/ajax.js';
import router from './router/router.js';

router.initialize(AUTH, PAGES_ROUTES, serverHost);
ajax.initialize(AUTH, API_ROUTES);

const rootElement = document.getElementById('root');
const mainElement = document.createElement('main');

rootElement.appendChild(mainElement);

router.init('loginPage', logoutRequired(renderLogin));
router.init('signupPage', logoutRequired(renderSignup));

router.init('mainPage', renderMain);
router.init('adsListByCity', renderMain);
router.init('adsListByCategory', renderMain);
router.init('adPage', renderAdvert);

router.on('checkAuth', ajax.checkAuth.bind(ajax));

const header = new Header();


/**
 * logout Required Decorator.
 * @param {HTMLElement} render
 * @return {function}
 */
function logoutRequired(render) {
  return function() {
    if (AUTH.is_auth === true) {
      history.pushState({page: '/'}, 'main', '/');
      document.title = 'main';
      return renderMain();
    }
    return render();
  };
};

/**
 * Return login page.
 * @return {HTMLElement} - The login page.
 */
function renderLogin() {
  mainElement.innerHTML = '';
  const login = new Login();
  return login.render();
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
  const main = new Main(header);
  return main.render();
}

/**
 * Returns advert page.
 * @return {HTMLElement} - The advert page.
 */
function renderAdvert() {
  mainElement.innerHTML = '';
  const advert = new Advert(header);
  return advert.render();
}

window.addEventListener('popstate', (event) => {
  router.popPage(event, mainElement);
});

router.popPage(window.event, mainElement);
