'use strict';

import ObservableMixin from '../modules/observableMixin';
import ajax from '../modules/ajax';

/**
 * Model represented a favorites behavior
 */
class Favorites {
  #favoritesItems;

  /**
   *
   */
  constructor() {
    this.#favoritesItems = [];
    this.listeners = {};
  }

  /**
   *
   */
  async initialize() {
    this.isInitialized = true;
    // const tempItems = await this.getFavorites();
    const adverts = [101, 115, 121];
    // tempItems.forEach((item) => {
    //   const {advert} = item;
    //   adverts.push(advert.id);
    // });
    this.#favoritesItems = adverts;
  }

  /**
   *
   */
  get favoritesItems() {
    return this.#favoritesItems;
  }

  /**
   *
   * @return {*}
   */
  async getFavorites() {
    // ПЕРЕПИСАТЬ

    let favoritesItems = [];
    await ajax.get(
        ajax.routes.CART.GET_CART_LIST,
        (body) => {
          const items = body['items'];
          if (items !== undefined) {
            favoritesItems = items;
          }
        },
    );

    return favoritesItems;
  }

  /**
   *
   * @param {*} advertId
   * @return {Promise}
   */
  async changeFavorites(advertId) {
    const result = this.#favoritesItems.includes(advertId);
    if (!result) {
      this.#favoritesItems.push(advertId);
    } else {
      const ind = this.favoritesItems.indexOf(advertId);
      this.#favoritesItems.splice(ind, 1);
    }

    // ДОБАВИТЬ AJAX

    // await ajax.post(
    //     ajax.routes.CART.CHANGE_CART_ITEM_STATUS,
    //     {advertId},
    //     (body) => {
    //       const {isAppended} = body;
    //       if (isAppended) {
    //         this.#favoritesItems.push(advertId);
    //       } else {
    //         this.#favoritesItems.pop(advertId);
    //       }
    //       result = isAppended;
    //     },
    // );
    this.emit('favoritesChange', this.#favoritesItems.length);

    return result;
  }
}

Object.assign(Favorites.prototype, ObservableMixin);

export default new Favorites();
