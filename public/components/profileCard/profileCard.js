'use strict';

import BlackListOverlay from '../../components/blackListOverlay/blackListOverlay.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './profileCard.hbs';
import styles from './profileCard.scss';


/**
 *
 */
class ProfileCard {
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
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();
    const overlayContainer = this.#element.querySelector('.overlay-container-blacklist');

    return this.#element;
  }

  /**
   *
   */
  #renderTemplate() {
    const context = {
      merchantsName: this.items.merchantsName,
      location: this.items.location,
      registrationDate: this.items.registrationDate,
      isProfileVerified: this.items.isProfileVerified,
      reviewCount: this.items.reviewCount,
      subscribersCount: this.items.subscribersCount,
      subscribtionsCount: this.items.subscribtionsCount,
    };
    this.#element = stringToHtmlElement(template(context));
  }
}

export default ProfileCard;
