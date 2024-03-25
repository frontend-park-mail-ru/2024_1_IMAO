'use strict';

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

    await this.#ajax(this.#fullAdress(url), callback, init);
  }

  /**
   * Make a GET request.
   * @param {string} url - The request path.
   * @param {function} callback - The callback function.
   */
  async get(url, callback) {
    const init = {
      method: GET,
      mode: 'cors',
      credentials: 'include',
    };

    await this.#ajax(this.#fullAdress(url), callback, init);
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
   * Make a full adress to API.
   * @param {string} route - The relative request path.
   * @return {string} - The full request path.
   */
  #fullAdress(route) {
    return (this.routes.api + route);
  }

  /**
   * Make scheme of the AJAX request.
   * @param {string} url - The relative request path.
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
