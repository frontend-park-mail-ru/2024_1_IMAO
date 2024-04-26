'use strict';

import trimString from '../../modules/trimString.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import HoverSlider from '../../components/hoverSlider/hoverSlider.js';
import template from './adsCard.hbs';
import styles from './adsCard.scss';

const MAX_TITLE_LENGTH = 20;

/**
 * Render an AdsCard template.
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @param {string | number} id - Product ID in database.
 * @param {string} path - Link to the advert page.
 */
class AdsCard {
  #element;

  /**
   *
   * @param {*} items
   */
  constructor(title, price, id, path, photosIMG) {
    this.title = title;
    this.price = price;
    this.id = id;
    this.path = path;
    this.photosIMG = photosIMG;
  }

  /**
   *
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();

    //this.#element.addEventListener();
    const hoverSliderInstance = new HoverSlider(this.photosIMG);
    const card = this.#element.querySelector('.card');
    card.prepend(hoverSliderInstance.render());
    return this.#element;
  }

  /**
   *
   */
  #renderTemplate() {
    const titleTrim = trimString(this.title, MAX_TITLE_LENGTH);

    const context = {
      title : this.title,
      titleTrim : titleTrim,
      price : this.price,
      id : this.id,
      path : this.path,
      photo : this.photosIMG
      
    };
     
    this.#element = stringToHtmlElement(template(context));
  }
}

export default AdsCard;
