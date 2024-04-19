'use strict';

import ajax from '../modules/ajax';

/**
 * Model represented a cart behavior
 */
class Cart {
  #cartItems;

  /**
   *
   */
  constructor() {
    this.#cartItems = [];
    this.listeners = {};
  }

  /**
   *
   */
  async initialize() {
    this.isInitialized = true;
    const tempItems = await this.getCart();
    const adverts = [];
    tempItems.forEach((item) => {
      const {advert} = item;
      adverts.push(advert.id);
    });
    this.#cartItems = adverts;
  }

  /**
   *
   */
  get cartItems() {
    return this.#cartItems;
  }

  /**
   *
   * @return {*}
   */
  async getCart() {
    let cartItems = [];
    await ajax.get(
        ajax.routes.CART.GET_CART_LIST,
        (body) => {
          const items = body['items'];
          if (items !== undefined) {
            cartItems = items;
          }
        },
    );

    return cartItems;
  }

  /**
   *
   * @param {*} advertId
   * @return {Promise}
   */
  async changeCart(advertId) {
    let result = false;
    await ajax.post(
        ajax.routes.CART.CHANGE_CART_ITEM_STATUS,
        {advertId},
        (body) => {
          const {isAppended} = body;
          if (isAppended) {
            this.#cartItems.push(advertId);
          } else {
            this.#cartItems.pop(advertId);
          }
          result = isAppended;
        },
    );
    this.emit('cartChange', this.#cartItems.length);

    return result;
  }

  /**
   *
   * @param {*} advertIDs
   */
  async deleteFromCart(advertIDs) {
    await ajax.post(
        ajax.routes.CART.DELETE_CART_ITEM,
        {advertIDs},
        (body)=>{
          advertIDs.forEach((advertId) => {
            this.#cartItems.pop(advertId);
          });
          this.emit('cartChange', this.#cartItems.length);

          return;
        },
    );
  }

  /**
   *
   * @param {*} event
   * @param {*} callback
   */
  on(event, callback) {
    if (this.listeners[event] === undefined) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   *
   * @param {*} event
   * @param {*} data
   */
  emit(event, data) {
    for (const listener of this.listeners[event]) {
      listener(data);
    }
  }
}

export default new Cart();
