'use strict';

import {CATEGORIES} from '../../config/config.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './header.hbs';
import styles from './header.scss';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';
import cartModel from '../../models/cart.js';

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
    this.#renderHeaderTemplate('Москва');
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

    // const cartButton = this.#header.querySelector('.cart-action');
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
        ev.preventDefault();
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
      ev.preventDefault();
      ajax.post(
          ajax.routes.AUTH.LOGOUT,
          null,
          (body) => {
            // eslint-disable-next-line camelcase
            ajax.auth.is_auth = body.isAuth;
            this.#renderHeaderTemplate('Москва');
            this.#addListeners();
            const main = document.querySelector('main');
            router.popPage(ev, main);
          },
      );
    });
  }

  /**
   * Renders a template for a header.
   * @private
   * @param {URL} location - The location to be displayed in the header.
   * @return {void}
   */
  #renderHeaderTemplate(location) {
    const urlMain = router.routes.mainPage.href.href;
    const urlLogin = router.routes.loginPage.href.href;
    const urlCreate = router.routes.adCreationPage.href.href;
    const urlCart = router.routes.cartPage.href.href;
    const urlProfile = router.routes.profilePage.href.href;
    const flag = router.auth.is_auth;
    const cartQuantity = cartModel.cartItems.length;
    while (this.#header.firstChild) {
      this.#header.removeChild(this.#header.lastChild);
    }
    this.#header.appendChild(stringToHtmlElement(template({
      urlMain,
      urlLogin,
      urlCreate,
      urlCart,
      urlProfile,
      flag,
      location,
      CATEGORIES,
      cartQuantity,
    })));
  }

  /**
   *
   * @param {*} quantity
   */
  changeCartQuantity(quantity) {
    const quanSpan = this.#header.querySelector('.cart-quantity');
    quanSpan.innerHTML = quantity;
  }
}
