'use strict';

import {API_ROUTES, PAGES_ROUTES, AUTH} from './config/config.js';
import {Header} from './components/header/header.js';
import {Main} from './pages/main/main.js';
import {Login} from './pages/login/login.js';
import {Signup} from './pages/signup/signup.js';
import {Advert} from './pages/advert/advert.js';
import {Cart} from './pages/cart/cart.js';
import ajax from './modules/ajax.js';
import router from './router/router.js';

router.initialize(AUTH, PAGES_ROUTES);
ajax.initialize(AUTH, API_ROUTES);

const rootElement = document.getElementById('root');
const mainElement = document.createElement('main');

rootElement.appendChild(mainElement);

router.initialize(AUTH, PAGES_ROUTES);
ajax.initialize(AUTH, API_ROUTES);

router.init('loginPage', logoutRequired(renderLogin));
router.init('signupPage', logoutRequired(renderSignup));
router.init('mainPage', renderMain);
router.init('adPage', renderAdvert);
router.init('cartPage', renderCart);

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

/**
 * Return cart page.
 * @return {HTMLElement} - The main page.
 */
function renderCart() {
  mainElement.innerHTML = '';
  const cart = new Cart(header);
  return cart.render();
  // const empty = document.createElement('div');
  // empty.classList.add('main-page');
  // empty.appendChild(header.render());

  // const appendButton = document.createElement('a');
  // appendButton.innerHTML = 'Добавить в корзину';
  // appendButton.classList.add('btn-success');
  // empty.appendChild(appendButton);
  // appendButton.addEventListener('click', (ev) => {
  //   const advertID = 2;
  //   ajax.post(
  //       ajax.routes.cartAppend,
  //       {advertID},
  //       (body)=>console.log(body),
  //   );
  // });

  // const deleteButton = document.createElement('a');
  // deleteButton.innerHTML = 'Удалить из корзины';
  // deleteButton.classList.add('btn-success');
  // empty.appendChild(deleteButton);
  // deleteButton.addEventListener('click', (ev) => {
  //   const advertIDs = [7];
  //   ajax.post(
  //       ajax.routes.cartDelete,
  //       {advertIDs},
  //       (body)=>console.log(body),
  //   );
  // });

  // ajax.get(
  //     ajax.routes.cartList,
  //     (body) => {
  //       const cont = document.createElement('div');
  //       empty.appendChild(cont);
  //       cont.innerHTML += JSON.stringify(body);
  //     },
  // );
  // return empty;
}

window.addEventListener('popstate', (event) => {
  router.popPage(event, mainElement);
});

router.popPage(window.event, mainElement);
