'use strict';

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
 * @param {string} href - The route to follow.
 * @param {HTMLElement} parant - The container for a page.
 */
  async #locationResolver(href, parant) {
    await this.emit('checkAuth');

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
