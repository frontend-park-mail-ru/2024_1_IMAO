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
import {Cart} from './pages/cart/cart.js';
import {Order} from './pages/oreder/order.js';
import ajax from './modules/ajax.js';
import router from './router/router.js';

router.initialize(AUTH, PAGES_ROUTES, serverHost);
ajax.initialize(AUTH, API_ROUTES);
//ajax.initialize(AUTH, API);

const rootElement = document.getElementById('root');
const mainElement = document.createElement('main');

rootElement.appendChild(mainElement);

router.initialize(AUTH, PAGES_ROUTES);
ajax.initialize(AUTH, API_ROUTES);

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
router.init('cartPage', loginRequired(renderCart));
router.init('orderPage', loginRequired(renderOrder));

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
      history.replaceState({page: '/'}, 'main', '/');
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
  //   const advertID = 5;
  //   ajax.post(
  //       ajax.routes.CART.CHANGE_CART_ITEM_STATUS,
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
  //       ajax.routes.CART.DELETE_CART_ITEM,
  //       {advertIDs},
  //       (body)=>console.log(body),
  //   );
  // });

  // ajax.get(
  //     ajax.routes.CART.GET_CART_LIST,
  //     (body) => {
  //       const cont = document.createElement('div');
  //       empty.appendChild(cont);
  //       cont.innerHTML += JSON.stringify(body);
  //     },
  // );
  // return empty;
}

/**
 * Return cart page.
 * @return {HTMLElement} - The main page.
 */
function renderOrder() {
  mainElement.innerHTML = '';
  const order = new Order(header);
  return order.render();
  // const empty = document.createElement('div');
  // empty.classList.add('main-page');
  // empty.appendChild(header.render());

  // const appendButton = document.createElement('a');
  // appendButton.innerHTML = 'Добавить в заказ';
  // appendButton.classList.add('btn-success');
  // empty.appendChild(appendButton);

  // appendButton.addEventListener('click', (ev) => {
  //   const adverts = [
  //     // {
  //     //   advertId: 7,
  //     //   phone: '89165850582',
  //     //   name: 'Оглоблин А.А',
  //     //   email: 'doroga218@gmail.com',
  //     //   adress: 'Рязанский проспект',
  //     //   deliveryPrice: 49,
  //     // },
  //     {
  //       advertId: 7,
  //       phone: '89165850582',
  //       name: 'Оглоблин А.А',
  //       email: 'doroga218@gmail.com',
  //       adress: 'Рязанский проспект',
  //       deliveryPrice: 49,
  //     },
  //   ];

  //   ajax.post(
  //       ajax.routes.ORDER.CREATE_ORDERS,
  //       {adverts},
  //       (body)=>console.log(body),
  //   );
  // });

  // // const deleteButton = document.createElement('a');
  // // deleteButton.innerHTML = 'Удалить из корзины';
  // // deleteButton.classList.add('btn-success');
  // // empty.appendChild(deleteButton);
  // // deleteButton.addEventListener('click', (ev) => {
  // //   const advertIDs = [7];
  // //   ajax.post(
  // //       ajax.routes.CART.DELETE_CART_ITEM,
  // //       {advertIDs},
  // //       (body)=>console.log(body),
  // //   );
  // // });

  // ajax.get(
  //     ajax.routes.ORDER.GET_ORDERS_LIST,
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

router.popPage(null, mainElement);
