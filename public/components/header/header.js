'use strict';

import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';

/** Class representing a header component. */
export class Header {
  #element;

  /**
   * Initialize a header.
   */
  constructor() {
    this.#element = document.createElement('header');
  }

  /**
   * Render the header.
   * @return {Element} - The element of header.
   */
  render() {
    this.#renderTamplate();
    this.#addListeners();

    return this.#element;
  }

  /**
   * Add event listeners for a header.
   */
  #addListeners() {
    const anchors = this.#element.getElementsByTagName('a');

    this.#addButtonsListeners(anchors);

    const logoutBtn = this.#element.getElementsByClassName('logout')[0];

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
            this.#renderTamplate();
          },
      );
    });
  }

  /**
   * Render a tamlate for a header.
   */
  #renderTamplate() {
    const template = Handlebars.templates['header.hbs'];
    const urlMain = router.routes.mainPage.href;
    const urlLogin = router.routes.loginPage.href;
    const flag = router.auth.is_auth;
    this.#element.innerHTML = template({urlMain, urlLogin, flag});
  }
}
