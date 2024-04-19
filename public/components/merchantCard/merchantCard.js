'use strict';

import BlackListOverlay from '../../components/blackListOverlay/blackListOverlay.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './merchantCard.hbs';
import styles from './merchantCard.scss';

/**
 *
 */
class MerchantCard {
  #element;

  /**
   *
   * @param {*} items
   */
  constructor(items) {
    this.items = items;
  }

  /**
   *
   * @return {*}
   */
  render() {
    this.#renderTemplate();
    const addToBlackListButton = this.#element.querySelector('.add-to-blacklist-button');
    const overlayContainer = this.#element.querySelector('.overlay-container-blacklist');
    this.#addBlackListEventListener(addToBlackListButton, overlayContainer);

    return this.#element;
  }

  /**
   *
   */
  #renderTemplate() {
    const context = {
      id: this.items.id,
      path: this.items.path,
      merchantsName: this.items.merchantsName,
      location: this.items.location,
      registrationDate: this.items.registrationDate,
      isProfileVerified: this.items.isProfileVerified,
      reviewCount: this.items.reviewCount,
      subscribersCount: this.items.subscribersCount,
      subscribtionsCount: this.items.subscribtionsCount,
      avatar: this.items.avatarImg,
    };

    this.#element = stringToHtmlElement(template(context));
  }

  /**
   *
   * @param {*} addToBlackListButton
   * @param {*} overlayContainer
   */
  #addBlackListEventListener(addToBlackListButton, overlayContainer) {
    const blacklistOverlay = new BlackListOverlay(addToBlackListButton);
    overlayContainer.appendChild(blacklistOverlay.render());
  }
}

export default MerchantCard;
