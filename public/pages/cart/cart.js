'use strict';

import {renderCartBlock} from '../../components/cartBlock/cartBlock.js';
import {renderCartMain} from '../../components/cartMain/cartMain.js';
import {renderSidebar} from '../../components/sidebar/sidebar.js';
import ajax from '../../modules/ajax.js';

/** Class representing a main page. */
export class Cart {
  #element;

  /**
   * Initialize a main page.
   * @param {*} header
   */
  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
  }

  /**
   * Render the main page.
   * @return {Element} - The element of main page.
   */
  render() {
    this.#renderTemplate();

    return this.#element;
  }

  /**
   * Render a template for a main page.
   */
  #renderTemplate() {
    this.#element.appendChild(this.header.render());

    ajax.get(
        ajax.routes.cartList,
        (body) => {
          const adverts = body['items'];

          if (!(adverts && Array.isArray(adverts))) {
            return;
          }
          const quantity = adverts.length;
          this.#element.innerHTML += renderCartMain(quantity);

          const selectPanel = this.#element.querySelector('.selection-panel');
          let priceSum = 0;

          adverts.forEach((advert) => {
            const {price, title} = advert;
            priceSum += Number(price);
            selectPanel.innerHTML += renderCartBlock(title, price);
          });

          const mainCont = this.#element.querySelector('.main-content');

          mainCont.innerHTML += renderSidebar(quantity, priceSum);
        },
    );
  }
}
