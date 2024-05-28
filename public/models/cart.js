'use strict';

import ObservableMixin from '../modules/observableMixin';
import ajax from '../modules/ajax';

/**
 * Model represented a cart behavior
 */
class Cart {
  /**
   * Constructor for a cart model.
   */
  constructor() {
    this.listeners = {};
  }

  /**
   * Gets adverts in cart.
   * @return {*}
   */
  async getCart() {
    let cartItems = [];
    await ajax.get(ajax.routes.CART.GET_CART_LIST, (body) => {
      const items = body['items'];
      if (items !== undefined) {
        cartItems = items;
      }
    });

    return cartItems;
  }

  /**
   * Changes status of advert in cart.
   * @param {number} advertId
   * @return {Promise}
   */
  async changeCart(advertId) {
    let result = false;
    await ajax.post(ajax.routes.CART.CHANGE_CART_ITEM_STATUS, {advertId}, (body) => {
      const isAppended = body?.items?.isAppended;
      if (isAppended) {
        ajax.auth.cartNum++;
      } else {
        ajax.auth.cartNum--;
      }
      result = isAppended;
    });
    this.emit('cartChange', ajax.auth.cartNum);

    return result;
  }

  /**
   * Deletes adverts from cart.
   * @param {*} advertIDs
   */
  async deleteFromCart(advertIDs) {
    await ajax.post(ajax.routes.CART.DELETE_CART_ITEM, {advertIDs}, (body) => {
      advertIDs.forEach((advertId) => {
        ajax.auth.cartNum--;
      });
      this.emit('cartChange', ajax.auth.cartNum);

      return;
    });
  }
}

Object.assign(Cart.prototype, ObservableMixin);

export default new Cart();
