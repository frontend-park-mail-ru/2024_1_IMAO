'use strict';

import ObservableMixin from '../modules/observableMixin';
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
}

Object.assign(Cart.prototype, ObservableMixin);

export default new Cart();
