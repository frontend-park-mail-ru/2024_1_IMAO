'use strict';

import {getURLFromLocation} from '../modules/parsePathParams.js';

/** */
class Router {
  /**
   *
   * @param {*} auth
   * @param {*} routes
   */
  initialize(auth, routes) {
    this.auth = auth;
    this.routes = routes;
    this.listeners = {};
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
 * Router.
 * @param {URL} href - The route to follow.
 * @param {HTMLElement} parent - The container for a page.
 */
  async #locationResolver(href, parent) {
    await this.emit('checkAuth');

    Object.entries(this.routes).forEach(([_, route]) => {
      if (route.re.test(href.pathname)) {
        document.title = route.name;
        parent.appendChild(route.render());
        return;
      }
    });
  };

  /**
   * Changing page via url.
   * @param {Event} event
   * @param {HTMLElement} container - The container to render.
   */
  popPage(event, container) {
    let location = window.location.href;

    if (event?.state) {
      location = event.state.page;
    }

    if (location) {
      this.#locationResolver(getURLFromLocation(location), container);
    }
  };

  /**
   *
   * @param {*} event
   * @param {string} href
   */
  pushPage(event, href) {
    const url = getURLFromLocation(href);
    const path = url.pathname;
    event.preventDefault();
    history.pushState({page: path}, path, path);
    const main = document.getElementsByTagName('main')[0];
    this.#locationResolver(url, main);
  }

  /**
   *
   * @param {URL} url
   */
  go(url) {
    const path = url.pathname;
    history.replaceState({page: path}, path, path);
    const main = document.getElementsByTagName('main')[0];
    this.#locationResolver(url, main);
  }
  /**
   *
   * @param {*} event
   * @param {*} callback
   */
  on(event, callback) {
    if (this.listeners[event] === undefined) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   *
   * @param {*} event
   * @param {*} data
   */
  async emit(event, data) {
    for (const listener of this.listeners[event]) {
      await listener(data);
    }
  }
};

export default new Router();
