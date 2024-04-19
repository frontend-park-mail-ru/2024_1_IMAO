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

    let previousCheckedRadio = this.#element.
        querySelector('input[type="radio"][name="radio-vertical"][value="adverts"]:checked');

    const changeHandler = function(event) {
      const currentCheckedRadio = event.target;
      const name = currentCheckedRadio.name;

      if (name !== 'radio-vertical') return;

      if (previousCheckedRadio && previousCheckedRadio !== currentCheckedRadio) {
        const svgPath = previousCheckedRadio.parentNode.previousElementSibling.firstElementChild.firstElementChild;
        svgPath.setAttribute('fill', '#333333');
      }

      if (currentCheckedRadio.checked) {
        const svgPath = currentCheckedRadio.parentNode.previousElementSibling.firstElementChild.firstElementChild;
        svgPath.setAttribute('fill', '#7092FE');
      }

      previousCheckedRadio = currentCheckedRadio;
    };

    this.#element.addEventListener('change', changeHandler, false);

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
      avatar: this.items.avatarImg,
    };
    this.#element = stringToHtmlElement(template(context));
  }
}

export default ProfileCard;
