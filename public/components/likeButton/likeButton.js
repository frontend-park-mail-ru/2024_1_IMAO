'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './likeButton.hbs';
import styles from './likeButton.scss';


/**
 *
 */
class LikeButton {
  #element;

  /**
   *
   * @param {*} items
   */
  constructor(inFavorites) {
    this.inFavorites = inFavorites;
  }

  /**
   *
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();

    this.#addEventListener();

    return this.#element;
  }

  /**
   *
   */
  #renderTemplate() {
    const context = {
        inFavorites: this.inFavorites,
    };
    this.#element = stringToHtmlElement(template(context));
  }

    #addEventListener() {
        const el = this.#element
        this.#element.addEventListener('click', explode);
        function explode(e) {
            el.classList.toggle('active');
        }
    }
}
export default LikeButton;
