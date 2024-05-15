'use strict';

import renderOrderItem from '../../components/orderItem/orderItem.js';
import renderOrderMain from '../../components/orderMain/orderMain.js';
import renderSidebar from '../../components/sidebar/sidebar.js';
import {serverHost} from '../../config/config.js';
import {buildURLBySegments} from '../../modules/parsePathParams.js';
import addDynamicPhoneForm from '../../modules/dynamicPhone.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';

/** Class representing a main page. */
export class Order {
  #element;
  #deliveriPrice;
  /**
   * Initialize a main page.
   * @param {*} header
   */
  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
    this.#deliveriPrice = 49;
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
   * Adds listeners for rder page.
   */
  #addListeners() {
    const quantity = this.#element.querySelector('[id="quantity"]');
    const priceSum = this.#element.querySelector('[id="priceSum"]');

    const des = this.#element.querySelectorAll('.order-item__delete-icon');

    this.#addDeleteListener(des, quantity, priceSum);

    const submit = this.#element.querySelector('.sidebar__button');
    const form = this.#element.querySelector('.recipient-form');

    this.#addSubmitListener(submit, form);

    const phoneInput = this.#element.querySelector('[type="tel"]');
    addDynamicPhoneForm(phoneInput);
  }

  /**
   * Adds submit listener.
   * @param {*} submit
   * @param {*} form
   * @param {*} ads
   */
  #addSubmitListener(submit, form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      submit.disabled = true;

      const forms = this.#element.querySelectorAll('input');
      const inputs = [];
      for (const pair of forms) {
        inputs.push(pair.value);
      }

      const name = inputs[1].trim();
      const phone = inputs[2].trim();
      const email = inputs[3].trim();
      const address = inputs[4];

      const orderItems = {adverts: []};
      const order = JSON.parse(sessionStorage.getItem(ajax.auth.id));
      const deliveryPrice = this.#deliveriPrice;
      for (const orderItem in order) {
        if (Object.hasOwn(order, orderItem)) {
          const advertID = order[orderItem].advert.id;
          orderItems.adverts.push({
            advertID,
            phone,
            name,
            email,
            address,
            deliveryPrice,
          });
        }
      }
      ajax.post(ajax.routes.ORDER.CREATE_ORDERS, orderItems, (body) => {
        const {isCreated} = body;

        if (isCreated !== undefined) {
          const slugProfileOrders = ['profile', 'orders'];
          const urlProfileOrders = buildURLBySegments(serverHost, slugProfileOrders);
          router.go(urlProfileOrders);
        }
      });
      sessionStorage.removeItem(ajax.auth.id);
    });
  }

  /**
   * Adds delete from order listener.
   * @param {NodeListOf} ads
   * @param {HTMLElement} quantity
   * @param {HTMLElement} priceSum
   */
  #addDeleteListener(ads, quantity, priceSum) {
    for (const element of ads) {
      element.addEventListener('click', (ev) => {
        const id = element.dataset.id;
        element.checked = false;
        const advert = this.#element.querySelector(`[id="${id}"]`);
        const price = Number(advert.querySelector('.price').innerHTML);
        priceSum.innerHTML = Number(priceSum.innerHTML) - price - this.#deliveriPrice;
        quantity.innerHTML = Number(quantity.innerHTML) - 1;
        const order = JSON.parse(sessionStorage.getItem(ajax.auth.id));
        delete order[id];
        sessionStorage.setItem(ajax.auth.id, JSON.stringify(order));
        advert.remove();
      });
    }
  }

  /**
   * Render a template for a main page.
   */
  async #renderTemplate() {
    this.#element.appendChild(this.header.render());
    this.#element.appendChild(renderOrderMain());

    const selectPanel = this.#element.querySelector('.order-page__container');
    const order = JSON.parse(sessionStorage.getItem(ajax.auth.id));
    const quantity = Object.keys(order).length;
    let priceSum = 0;
    let num = 1;
    if (quantity === 0) {
      router.go(router.routes.cartPage.href);

      return;
    }

    for (const orderItem in order) {
      if (Object.hasOwn(order, orderItem)) {
        const {advert, photosIMG} = order[orderItem];
        const {id, title, price} = advert;
        priceSum += Number(price) + this.#deliveriPrice;
        selectPanel.appendChild(renderOrderItem(num, id, title, price, photosIMG?.[0]));
        num++;
      }
    }

    // eslint-disable-next-line max-len
    const mainCont = this.#element.querySelector('.order-page__container__sidebar');
    mainCont.appendChild(renderSidebar(quantity, priceSum));
    this.#element.querySelector('.sidebar__description').innerHTML = 'Цена с доставкой';

    this.#addListeners();
  }
}
