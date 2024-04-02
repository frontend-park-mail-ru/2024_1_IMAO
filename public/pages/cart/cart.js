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
   *
   */
  #addListeners() {
    const allCheckbox = this.#element.querySelector('[name="cartBlocks"]');
    const ads = this.#element.querySelectorAll('[name="product"]');

    this.#addCheckboxesListener(allCheckbox, ads);

    const quantity = this.#element.querySelector('[id="quantity"]');
    const headQuantity = this.#element.querySelector('.basket__quantity');
    const priceSum = this.#element.querySelector('[id="priceSum"]');

    const des = this.#element.querySelectorAll('.cart-block__item-delete-icon');

    this.#addDeleteListener(des, quantity, headQuantity, priceSum);

    const button = this.#element.querySelector('.selection-panel__action');

    this.#addDeleteCheckedListener(button, quantity, headQuantity, priceSum);
  }

  /**
   *
   * @param {HTMLElement} allCheckbox
   * @param {NodeListOf} ads
   */
  #addCheckboxesListener(allCheckbox, ads) {
    // const allCheckbox = this.#element.querySelector('[name="cartBlocks"]');
    // const ads = this.#element.querySelectorAll('[name="product"]');

    allCheckbox.addEventListener('change', () => {
      ads.forEach((checkbox) => {
        checkbox.checked = allCheckbox.checked;
      });
    });

    ads.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        if (!checkbox.checked) {
          allCheckbox.checked = false;
        } else {
          allCheckbox.checked = Array.from(ads).every((chbox) => chbox.checked);
        }
      });
    });
  }

  /**
   *
   * @param {HTMLElement} button
   * @param {HTMLElement} quantity
   * @param {HTMLElement} headQuantity
   * @param {HTMLElement} priceSum
   */
  #addDeleteCheckedListener(button, quantity, headQuantity, priceSum) {
    // const button = this.#element.querySelector('.selection-panel__action');
    // const quantity = this.#element.querySelector('[id="quantity"]');
    // const headQuantity = this.#element.querySelector('.basket__quantity');
    // const priceSum = this.#element.querySelector('[id="priceSum"]');

    button.addEventListener('click', (ev) => {
      ev.preventDefault();
      const ads = this.#element.querySelectorAll('[name="product"]');

      for (const element of ads) {
        if (!element.checked) {
          continue;
        }
        const id = element.value;
        const advert = this.#element.querySelector(`[id="${id}"]`);
        advert.remove();
        const price = Number(advert.querySelector('.price').innerHTML);
        priceSum.innerHTML = Number(priceSum.innerHTML) - price;
        quantity.innerHTML = Number(quantity.innerHTML) - 1;
        headQuantity.innerHTML = quantity.innerHTML;
      }
    });
  }

  /**
   *
   * @param {NodeListOf} ads
   * @param {HTMLElement} quantity
   * @param {HTMLElement} headQuantity
   * @param {HTMLElement} priceSum
   */
  #addDeleteListener(ads, quantity, headQuantity, priceSum) {
    // const quantity = this.#element.querySelector('[id="quantity"]');
    // const headQuantity = this.#element.querySelector('.basket__quantity');
    // const priceSum = this.#element.querySelector('[id="priceSum"]');

    for (const element of ads) {
      element.addEventListener('click', (ev) => {
        const id = element.dataset.id;
        const advert = this.#element.querySelector(`[id="${id}"]`);
        const price = Number(advert.querySelector('.price').innerHTML);
        priceSum.innerHTML = Number(priceSum.innerHTML) - price;
        quantity.innerHTML = Number(quantity.innerHTML) - 1;
        headQuantity.innerHTML = quantity.innerHTML;
        advert.remove();
      });
    }
  }

  /**
   * Render a template for a main page.
   */
  async #renderTemplate() {
    this.#element.appendChild(this.header.render());
    let adverts ={};
    await ajax.get(
        ajax.routes.cartList,
        (body) => {
          adverts = body['items'];
        },
    );
    if (!(adverts && Array.isArray(adverts))) {
      return;
    }
    const quantity = adverts.length;
    this.#element.innerHTML += renderCartMain(quantity);

    const selectPanel = this.#element.querySelector('.selection-panel');
    let priceSum = 0;

    adverts.forEach((advert) => {
      const {id, price, title} = advert;
      priceSum += Number(price);
      selectPanel.innerHTML += renderCartBlock(id, title, price);
    });

    const mainCont = this.#element.querySelector('.main-content');

    mainCont.innerHTML += renderSidebar(quantity, priceSum);


    this.#addListeners();
  }
}
