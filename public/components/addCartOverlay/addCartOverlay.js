'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './addCartOverlay.hbs';
import './addCartOverlay.scss';
import router from '../../router/router.js';
import ajax from '../../modules/ajax.js';
import cartModel from '../../models/cart.js';

/**
 * Class represented an overlay to add into cart.
 */
class AddCartOverlay {
  #element;
  #model;
  /**
   * Constructor for overlay.
   * @param {HTMLElement} button
   */
  constructor(button) {
    this.button = button;
    this.#model = cartModel;
  }

  /**
   * Returns an overlay.
   * @return {HTMLElement}
   */
  async render() {
    this.#renderTemplate();

    await this.#addListeners();

    return this.#element;
  }

  /**
   * Renders an overlay.
   */
  #renderTemplate() {
    this.#element = stringToHtmlElement(template());
  }

  /**
   * Add listeners for overlay.
   */
  async #addListeners() {
    const myButton = this.button;
    myButton.addEventListener('click', async (ev) => {
      if (!ajax.auth.isAuth) {
        router.pushPage(ev, router.routes.loginPage.href.href);

        return;
      }

      myDialog.showModal();
      ev.preventDefault();
      const advertId = Number(myButton.dataset['id']);

      const isAppended = await this.#model.changeCart(advertId);

      if (isAppended === undefined) {
        return;
      }

      const textToChange = this.#element.querySelector('.add-to-cart-dialog__text-to-change');

      if (isAppended) {
        myButton.innerHTML = 'Удалить из корзины';
        textToChange.innerHTML = 'Товар добавлен в корзину';
      } else {
        myButton.innerHTML = 'Добавить в корзину';
        textToChange.innerHTML = 'Товар удалён из корзины';
      }
    });

    const myDialog = this.#element;
    myDialog.addEventListener('click', () => {
      myDialog.close();
    });

    const myDiv = this.#element.querySelector('.add-to-cart-dialog__container');
    myDiv.addEventListener('click', (event) => event.stopPropagation());

    const blockBtn = this.#element.querySelector('.add-to-cart-modal__button--action');
    blockBtn.addEventListener('click', (event) => {
      myDialog.close();
      router.pushPage(event, router.routes.cartPage.href.href);
    });

    const cancelBtn = this.#element.querySelector('.add-to-cart-modal__button--cancel');
    cancelBtn.addEventListener('click', (event) => myDialog.close());
  }
}

export default AddCartOverlay;
