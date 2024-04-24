'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './addCartOverlay.hbs';
import './addCartOverlay.scss';
import router from '../../router/router.js';
import ajax from '../../modules/ajax.js';

/**
 *
 */
class AddCartOverlay {
  #element;
  #model;
  /**
   *
   * @param {*} button
   * @param {*} model
   */
  constructor(button, model) {
    this.button = button;
    this.#model = model;
  }

  /**
   *
   * @return {HTMLElement}
   */
  async render() {
    this.#renderTemplate();

    await this.#addListeners();

    return this.#element;
  }

  /**
   *
   */
  #renderTemplate() {
    this.#element = stringToHtmlElement(template());
  }

  /**
   *
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

    const blockBtn = this.#element.querySelector('.add-to-cart-dialog__modal-buttons-button--action');
    blockBtn.addEventListener('click', (event) => {
      myDialog.close();
      router.pushPage(event, router.routes.cartPage.href.href);
    });

    const cancelBtn = this.#element.querySelector('.add-to-cart-dialog__modal-buttons-button--cancel');
    cancelBtn.addEventListener('click', (event) => myDialog.close());
  }
}

export default AddCartOverlay;
