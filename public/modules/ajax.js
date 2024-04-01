'use strict';

import {buildUrl} from '../../modules/parsePathParams.js';

const GET = 'GET';
const POST = 'POST';

/** Class implements AJAX requests. */
class Ajax {
  /**
   *
   * @param {*} auth
   * @param {*} routes
   */
  initialize(auth, routes) {
    this.auth = auth;
    this.routes = routes;
  }

  /**
   * Make a POST request.
   * @param {string} url - The request path.
   * @param {URLSearchParams} body - The request body.
   * @param {function} callback - The callback function.
   */
  async post(url, body, callback) {
    const init = {
      method: POST,
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(body),
    };

    await this.#ajax(url, callback, init);
  }

  /**
   * Make a GET request.
   * @param {URL} url - The request path.
   * @param {function} callback - The callback function.
   * @param {string} params
   */
  async get(url, callback, params) {
    const init = {
      method: GET,
      mode: 'cors',
      credentials: 'include',
    };

    console.log(url.pathname);
    await this.#ajax(buildUrl(url, params), callback, init);
    console.log(url.pathname);
  }

  /**
   *
   */
  async checkAuth() {
    await this.get(
        this.routes.checkAuth,
        (body) => {
          if (body.isAuth === this.auth.is_auth) {
            return;
          }

          this.auth.is_auth = body.isAuth;
        },
    );
  };

  /**
   * Make scheme of the AJAX request.
   * @param {URL} url - The relative request path.
   * @param {function} callback - The callback function.
   * @param {object} init - Options of the request.
   */
  async #ajax(url, callback, init) {
    await fetch(url, init)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => callback(data))
        .catch((err) => alert(err));
  }
}

export default new Ajax();
