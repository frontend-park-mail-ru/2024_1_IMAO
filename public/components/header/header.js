'use strict';

import {CATEGORIES, serverHost} from '../../config/config.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './header.hbs';
import styles from './header.scss';
import {buildURLBySegments} from '../../modules/parsePathParams.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';

/** Class representing a header component. */
export class Header {
  #header;

  /**
   * Initialize a header.
   * @param {cart} cartModel
   */
  constructor(cartModel) {
    this.#header = document.createElement('header');
    this.cartModel = cartModel;
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
            ajax.auth.isAuth = body.isAuth;
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
    const slugProfileAdverts = ['profile', 'adverts'];
    const urlProfile = buildURLBySegments(serverHost, slugProfileAdverts);
    const slugProfileFavorites = ['profile', 'favorites'];
    const urlProfileFavorites = buildURLBySegments(serverHost, slugProfileFavorites);


    const flag = router.auth.isAuth;
    const avatar = router.auth.avatar;
    const cartQuantity = this.cartModel.cartItems.length;
    console.log(this.cartModel.cartItems);
    console.log(cartQuantity);
    while (this.#header.firstChild) {
      this.#header.removeChild(this.#header.lastChild);
    }
    const CategoriesWithUrl = CATEGORIES.map((category) => {
      const temp = ['Moscow', String(category.translation)];
      const urlurl = buildURLBySegments(serverHost, temp);
      const url = urlurl.href;
      const {name} = category;

      return {name, url};
    });
    this.#header.appendChild(stringToHtmlElement(template({
      urlMain,
      urlLogin,
      urlCreate,
      urlCart,
      urlProfile,
      urlProfileFavorites,
      flag,
      location,
      CategoriesWithUrl,
      avatar,
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
