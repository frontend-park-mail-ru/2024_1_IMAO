'use strict';

import {Header} from '../components/header/header.js';
import {Ajax} from '../modules/ajax.js';

const ajax = new Ajax();

/**
 * List of routes for internal and API requests.
 */
export const ROUTES = {
  main: '/',
  login: '/login',
  logout: '/logout',
  signup: '/signup',
  checkAuth: '/check_auth',
  mainPage: {
    href: '#/',
  },
  loginPage: {
    href: '#/login',
  },
  signupPage: {
    href: '#/signup',
  },
  /**
   * Init a page render function for route.
   * @param {object} route - The object with _Page postfix.
   * @param {HTMLElement} render - The rendered page.
   */
  init: (route, render) => {
    ROUTES[route].render = render;
  },
};

/**
 * Auth state.
 */
export const auth = {
  is_auth: false,
};

/**
 * List of logout required pages.
 */
const logoutPages = [ROUTES.loginPage.href, ROUTES.signupPage.href];

/**
 * Redirect to mein page if current page is logout required.
 * @param {string} href - The route to check.
 * @return {boolean} - Is logout required or not.
 */
const logoutRequired = (href) => {
  if (logoutPages.includes(href) && auth.is_auth === true) {
    const main = document.getElementsByTagName('main')[0];
    locationResolver(ROUTES.mainPage.href, main);
    return true;
  }
  return false;
};

/**
   Checking if user logged in and changeing auth state.
*/
const checkAuth = async () => {
  await ajax.get(
      ROUTES.checkAuth,
      (body) => {
        if (body.isAuth === auth.is_auth) {
          return;
        }

        auth.is_auth = body.isAuth;
        const headerElement = document.getElementsByTagName('header')[0];
        const header = new Header(headerElement);
        header.render();
      },
  );
};

/**
 * Router.
 * @param {string} href - The route to follow.
 * @param {HTMLElement} parant - The container for a page.
 */
export async function locationResolver(href, parant) {
  await checkAuth();

  if (logoutRequired(href)) {
    return;
  }
  Object.entries(ROUTES).forEach(([_, route]) => {
    const location = route?.href;

    if (location == href) {
      window.location.hash = location;
      parant.appendChild(route.render());
    }
  });
}
