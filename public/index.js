'use strict';

import {ROUTES, auth} from './routes/routes.js';
import {Main} from './pages/main/main.js';
import {Login} from './pages/login/login.js';
import {Signup} from './pages/signup/signup.js';
import router from './router/router.js';

router.initialize(auth, ROUTES.checkAuth);
const rootElement = document.getElementById('root');
const mainElement = document.createElement('main');

rootElement.appendChild(mainElement);

router.init('loginPage', logoutRequired(renderLogin));
router.init('signupPage', logoutRequired(renderSignup));
router.init('mainPage', renderMain);


// ROUTES.init('loginPage', logoutRequired(renderLogin));
// ROUTES.init('signupPage', logoutRequired(renderSignup));
// ROUTES.init('mainPage', renderMain);

// router.register('/', renderMain);
// router.register('/login', renderLogin);
// router.register('/signup', renderSignup);

/**
 * logout Required Decorator.
 * @param {HTMLElement} render
 * @return {function}
 */
function logoutRequired(render) {
  return function() {
    if (auth.is_auth === true) {
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
  const main = new Main();
  return main.render();
}

window.addEventListener('popstate', (event) => {
  router.popPage(event, mainElement);
});

router.popPage(window.event, mainElement);
