'use strict';

import HoverSlider from '../../components/hoverSlider/hoverSlider.js';
import LikeButton from '../../components/likeButton/likeButton.js';
import trimString from '../../modules/trimString.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './adsCard.hbs';
import styles from './adsCard.scss';
import router from '../../router/router.js';
import favoritesModel from '../../models/favorites.js';

const MAX_TITLE_LENGTH = 20;

/**
 * Class represented an AdsCard.
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @param {string | number} id - Product ID in database.
 * @param {string} path - Link to the advert page.
 */
class AdsCard {
  #element;

  /**
   * Constructor for AdsCart.
   * @param {*} title
   * @param {*} price
   * @param {*} id
   * @param {*} inFavorites
   * @param {*} path
   * @param {*} photosIMG
   */
  constructor(title, price, id, inFavorites, path, photosIMG, isPromoted) {
    this.title = title;
    this.price = price;
    this.id = id;
    this.path = path;
    this.photosIMG = photosIMG;
    this.inFavorites = inFavorites;
    this.isPromoted = isPromoted
  }

  /**
   * Returns an AdsCart.
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();

    // this.#element.addEventListener();
    const hoverSliderInstance = new HoverSlider(this.photosIMG);
    const card = this.#element.querySelector('.card');
    card.prepend(hoverSliderInstance.render());

    const likeButtonInstance = new LikeButton(this.inFavorites);
    const likeButton = this.#element.querySelector('.like-icon');
    likeButton.appendChild(likeButtonInstance.render());

    this.#addFavoritesListener();
   
    return this.#element;
  }

  /**
   * Add listeners for fovorites button.
   */
  #addFavoritesListener() {
    const likeBtn = this.#element.querySelector('.like-icon');

    likeBtn.addEventListener('click', async (event) => {
      event.preventDefault();

      if (!router.auth.isAuth) {
        router.pushPage(event, router.routes.loginPage.href.href);

        return;
      }

      const result = await favoritesModel.changeFavorites(this.id);
      const message = this.#element.querySelector('.message');
      if (result) {
        likeBtn.dataset.tooltip = 'Удалить\nиз избранного';
        message.innerHTML = 'Объявление добавлено в избранное';
      } else {
        likeBtn.dataset.tooltip = 'Добавить\nв избранное';
        message.innerHTML = 'Объявление удалено из избранного';
      }
      message.classList.remove('message--hidden');
      message.classList.add('message--active');
      setTimeout(() => {
        message.classList.add('message--hidden');
        message.classList.remove('message--active');
      }, 1000);
    });
  }

  /**
   * Render an AdsCard template.
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
      inFavorites: this.inFavorites,
      isPromoted: this.isPromoted,
    };

    this.#element = stringToHtmlElement(template(context));
  }
}

export default AdsCard;
