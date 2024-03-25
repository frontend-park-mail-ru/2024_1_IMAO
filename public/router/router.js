'use strict';

import ajax from '../modules/ajax.js';
import {Header} from '../components/header/header.js';

/** */
class Router {
  /**
   *
   */
  constructor() {
    this.routes = {
      mainPage: {
        href: '/',
        name: 'main',
      },
      loginPage: {
        href: '/login',
        name: 'login',
      },
      signupPage: {
        href: '/signup',
        name: 'signup',
      },
    };

    this.auth = null;
  }

  /**
   *
   * @param {*} auth
   * @param {*} checkAuthRoute
   */
  initialize(auth, checkAuthRoute) {
    this.auth = auth;
    this.checkAuthRoute = checkAuthRoute;
  }

  /**
   * Init a page render function for route.
   * @param {object} route - The object with _Page postfix.
   * @param {HTMLElement} render - The rendered page.
   */
  init(route, render) {
    this.routes[route].render = render;
  }

  /**
   *
   */
  async #checkAuth() {
    await ajax.get(
        this.checkAuthRoute,
        (body) => {
          if (body.isAuth === this.auth.is_auth) {
            return;
          }

          this.auth.is_auth = body.isAuth;
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
  async #locationResolver(href, parant) {
    await this.#checkAuth();

    Object.entries(this.routes).forEach(([_, route]) => {
      const location = route?.href;

      if (location == href) {
        document.title = route.name;
        parant.appendChild(route.render());
      }
    });
  };

  /**
   * Changing page via url.
   * @param {Event} event
   * @param {HTMLElement} container - The container to render.
   */
  popPage(event, container) {
    let location = window.location.pathname;

    if (event?.state) {
      location = event.state.page;
    }

    if (location) {
      this.#locationResolver(location, container);
    }
  };

  /**
   *
   * @param {*} event
   * @param {*} href
   */
  pushPage(event, href) {
    event.preventDefault();
    history.pushState({page: href}, href, href);
    const main = document.getElementsByTagName('main')[0];
    this.#locationResolver(href, main);
  }

  /**
   *
   * @param {*} href
   */
  go(href) {
    history.replaceState({page: href}, href, href);
    const main = document.getElementsByTagName('main')[0];
    this.#locationResolver(href, main);
  }
};

export default new Router();
