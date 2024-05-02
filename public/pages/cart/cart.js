'use strict';

import renderCartBlock from '../../components/cartBlock/cartBlock.js';
import renderCartMain from '../../components/cartMain/cartMain.js';
import renderSidebar from '../../components/sidebar/sidebar.js';
import {buildURLBySegments} from '../../modules/parsePathParams.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';

/** Class representing a main page. */
export class Cart {
  #element;
  #items;
  #model;

  /**
   * Initialize a main page.
   * @param {*} header
   * @param {*} model
   */
  constructor(header, model) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.#items = {};
    this.header = header;
    this.#model = model;
  }

  /**
   * Render the main page.
   * @return {Element} - The element of main page.
   */
  async render() {
    await this.#renderTemplate();
    this.#addListeners();

    return this.#element;
  }

  /**
   * Adds all listeners.
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

    // eslint-disable-next-line max-len
    this.#addDeleteCheckedListener(button, quantity, headQuantity, priceSum, ads);

    const submit = this.#element.querySelector('.sidebar__button');

    this.#addSubmitListener(submit, ads);
  }

  /**
   * Adds submit listener.
   * @param {*} submit
   * @param {*} ads
   */
  #addSubmitListener(submit, ads) {
    submit.addEventListener('click', (ev) => {
      ev.preventDefault();
      const store = this.#items[ajax.auth.id];
      const orderItems = {};
      for (const element of ads) {
        if (!element.checked) {
          continue;
        }
        const id = element.value;
        orderItems[id] = store[id];
      }
      sessionStorage.setItem(ajax.auth.id, JSON.stringify(orderItems));
      router.pushPage(ev, router.routes.orderPage.href.href);
    });
  }

  /**
   * Adds checks logic.
   * @param {HTMLElement} allCheckbox
   * @param {NodeListOf} ads
   */
  #addCheckboxesListener(allCheckbox, ads) {
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
   * Adds listener for all checked cart delete.
   * @param {HTMLElement} button
   * @param {HTMLElement} quantity
   * @param {HTMLElement} headQuantity
   * @param {HTMLElement} priceSum
   * @param {NodeListOf} ads
   */
  #addDeleteCheckedListener(button, quantity, headQuantity, priceSum, ads) {
    button.addEventListener('click', (ev) => {
      ev.preventDefault();
      const advertIDs = [];
      for (const element of ads) {
        if (!element.checked) {
          continue;
        }
        const id = element.value;
        advertIDs.push(Number(id));
        element.checked = false;
        const advert = this.#element.querySelector(`[id="${id}"]`);
        advert.remove();
        const price = Number(advert.querySelector('.price').innerHTML);
        priceSum.innerHTML = Number(priceSum.innerHTML) - price;
        quantity.innerHTML = Number(quantity.innerHTML) - 1;
        headQuantity.innerHTML = quantity.innerHTML;
      }
      this.#model.deleteFromCart(advertIDs);
    });
  }

  /**
   * Adds listener for cart delete.
   * @param {NodeListOf} ads
   * @param {HTMLElement} quantity
   * @param {HTMLElement} headQuantity
   * @param {HTMLElement} priceSum
   */
  #addDeleteListener(ads, quantity, headQuantity, priceSum) {
    for (const element of ads) {
      element.addEventListener('click', (ev) => {
        const id = element.dataset.id;
        this.#element.querySelector(`[value="${id}"]`).checked = false;
        const advert = this.#element.querySelector(`[id="${id}"]`);
        advert.remove();
        const price = Number(advert.querySelector('.price').innerHTML);
        priceSum.innerHTML = Number(priceSum.innerHTML) - price;
        quantity.innerHTML = Number(quantity.innerHTML) - 1;
        headQuantity.innerHTML = quantity.innerHTML;
        const advertIDs = [Number(id)];
        this.#model.deleteFromCart(advertIDs);
      });
    }
  }

  /**
   * Render a template for a cart page.
   */
  async #renderTemplate() {
    this.#element.appendChild(this.header.render());
    const adverts = await this.#model.getCart();
    const quantity = adverts.length;
    this.#element.appendChild(renderCartMain(quantity));

    const selectPanel = this.#element.querySelector('.selection-panel');
    let priceSum = 0;

    this.#items[ajax.auth.id] = {};

    const ids = [];

    adverts.forEach((item) => {
      let {city, category} = item;
      const {advert, photosIMG} = item;
      city = city.translation;
      category = category.translation;
      const {id, price, title} = advert;
      this.#items[ajax.auth.id][id] = advert;
      ids.push(id);
      priceSum += Number(price);
      const photo = photosIMG?.[0] ? photosIMG[0] : null;
      const path = buildURLBySegments(router.host, [city, category, id]);
      selectPanel.appendChild(renderCartBlock(id, title, price, path, photo));
    });

    ids.forEach((id) => {
      const address = this.#element.querySelector(`a[data-id="${id}"]`);
      address.addEventListener('click', (ev) => {
        ev.preventDefault();
        router.pushPage(ev, address.href);
      });
    });

    const mainCont = this.#element.querySelector('.main-content');

    mainCont.appendChild(renderSidebar(quantity, priceSum));
  }
}
