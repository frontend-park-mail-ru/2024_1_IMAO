'use strict';

import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';

/** Class representing a header component. */
export class Header {
  #header;

  /**
   * Initialize a header.
   */
  constructor() {
    this.#header = document.createElement('header');
  }

  /**
   * Render the header.
   * @return {Element} - The element of header.
   */
  render() {
    this.#renderHeaderTamplate('Москва');
    this.#addListeners();

return this.#header;
  }

  /**
   * Add event listeners for a header.
   */
  #addListeners() {
    const anchors = this.#header.getElementsByTagName('a');

    this.#addButtonsListeners(anchors);
    const logoutBtn = this.#header.getElementsByClassName('logout')[0];

    this.#addLogoutListener(logoutBtn);

  }

  /**
   *  Add event listeners for an interface buttons.
   * @param {HTMLCollectionOf<Element>} buttons - Interface buttons elements.
   */
  #addButtonsListeners(buttons) {
    for (const anchor of buttons) {
      if (anchor.dataset.url == undefined) {
        continue;
      }

      anchor.addEventListener('click', (ev) => {
        router.pushPage(ev, anchor.dataset.url);
      });
    }
  }

  /**
   * Add event listeners for a logout.
   * @param {HTMLElement} logoutBtn - The logout element.
   */
  #addLogoutListener(logoutBtn) {
    if (!logoutBtn) {
      return;
    }

    logoutBtn.addEventListener('click', (ev) => {
      ajax.post(
          ajax.routes.logout,
          null,
          (body) => {
            this.#renderHeaderTamplate();
          },
      );
    });
  }

  /**
 * Renders a template for a header.
 * @private
 * @param {string} location - The location to be displayed in the header.
 * @return {void}
 */
  #renderHeaderTamplate(location) {
    const template = Handlebars.templates['header.hbs'];
    const urlMain = router.routes.mainPage.href;
    const urlLogin = router.routes.loginPage.href;
    const flag = router.auth.is_auth;
    this.#header.innerHTML = template({urlMain, urlLogin, flag, location});
  }
}
