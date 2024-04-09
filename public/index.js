'use strict';

import {API_ROUTES, PAGES_ROUTES, AUTH, serverHost} from './config/config.js';
import {Header} from './components/header/header.js';
import {Main} from './pages/main/main.js';
import {Login} from './pages/login/login.js';
import {Signup} from './pages/signup/signup.js';
import {Advert} from './pages/advert/advert.js';
import {AdCreation} from './pages/advert/adCreation.js';
import {MerchantsPage} from './pages/merchantsPage/merchantsPage.js';
import {ProfilePage} from './pages/profilePage/profilePage.js';
import ajax from './modules/ajax.js';
import router from './router/router.js';

router.initialize(AUTH, PAGES_ROUTES, serverHost);
ajax.initialize(AUTH, API_ROUTES);
//ajax.initialize(AUTH, API);

const rootElement = document.getElementById('root');
const mainElement = document.createElement('main');

rootElement.appendChild(mainElement);

router.init('loginPage', logoutRequired(renderLogin));
router.init('signupPage', logoutRequired(renderSignup));
router.init('merchantsPage', renderMerchantsPage);
router.init('profilePage', renderProfilePage);
router.init('mainPage', renderMain);
router.init('adsListByCity', renderMain);
router.init('adsListByCategory', renderMain);
router.init('adPage', renderAdvert);
router.init('adCreationPage', loginRequired(renderAdCreation));
router.init('adEditingPage', loginRequired(renderAdEditing));

router.on('checkAuth', ajax.checkAuth.bind(ajax));

const header = new Header();

/**
 * logout Required Decorator.
 * @param {Function} render
 * @return {Function}
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
}

/**
 * login Required Decorator.
 * @param {Function} render
 * @return {Function}
 */
function loginRequired(render) {
  return function() {
    if (AUTH.is_auth !== true) {
      history.pushState({page: '/login'}, 'login', '/login');
      document.title = 'login';

      return renderLogin();
    }

    return render();
  };
}

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

return signup.render();
}

/**
 * Return merchant's page.
 * @return {HTMLElement} - The merchant's page.
 */
function renderMerchantsPage() {
  mainElement.innerHTML = '';
  const merchantsPage = new MerchantsPage(header);

return merchantsPage.render();
}

/**
 * Return merchant's page.
 * @return {HTMLElement} - The merchant's page.
 */
function renderProfilePage() {
  mainElement.innerHTML = '';
  const profilePage = new ProfilePage(header);

return profilePage.render();
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

/**
 * Returns advert creation page.
 * @return {HTMLElement} - The advert creation/editing page.
 */
function renderAdCreation() {
  mainElement.innerHTML = '';
  const adCreation = new AdCreation(header, true);

  return adCreation.render();
}

/**
 * Returns advert editing page.
 * @return {HTMLElement} - The advert creation/editing page.
 */
function renderAdEditing() {
  mainElement.innerHTML = '';
  const adEditing = new AdCreation(header, false);

  return adEditing.render();
}

window.addEventListener('popstate', (event) => {
  router.popPage(event, mainElement);
});

router.popPage(window.event, mainElement);

