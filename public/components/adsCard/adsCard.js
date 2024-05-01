'use strict';

import HoverSlider from '../../components/hoverSlider/hoverSlider.js';
import LikeButton from '../../components/likeButton/likeButton.js';
import trimString from '../../modules/trimString.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './adsCard.hbs';
import styles from './adsCard.scss';
import favoritesModel from '../../models/favorites.js';

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

    // this.#element.addEventListener();
    const hoverSliderInstance = new HoverSlider(this.photosIMG);
    const card = this.#element.querySelector('.card');
    card.prepend(hoverSliderInstance.render());

    const likeButtonInstance = new LikeButton();
    const likeButton = this.#element.querySelector('.like-icon');
    likeButton.appendChild(likeButtonInstance.render());

    this.#addFavoritesListener();

    return this.#element;
  }

  /**
   *
   */
  #addFavoritesListener() {
    const likeBtn = this.#element.querySelector('.like-icon');
    
    likeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      //const card = this.#element.querySelector('.card');
      //const href = card.href;
      //card.href = '';
      const result = favoritesModel.changeFavorites(this.id);
      if (!result) {
        likeBtn.src = 'images/like_fill_red_28.svg';
      } else {
        likeBtn.src = 'images/like_outline_28.svg';
      }
      //card.href = href;
    });
  }

  /**
   *
   */
  #renderTemplate() {
    const titleTrim = trimString(this.title, MAX_TITLE_LENGTH);

    const context = {
      title: this.title,
      titleTrim: titleTrim,
      price: this.price,
      id: this.id,
      path: this.path,
      photo: this.photosIMG,
      inFavorites: favoritesModel.favoritesItems.includes(Number(this.id)),
    };

    this.#element = stringToHtmlElement(template(context));
  }
}

export default AdsCard;
