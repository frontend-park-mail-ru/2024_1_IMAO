'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './likeButton.hbs';
import styles from './likeButton.scss';

/**
 * Class represents a like button instance.
 */
class LikeButton {
  #element;

  /**
   * Constructor for a like button.
   * @param {*} inFavorites
   */
  constructor(inFavorites) {
    this.inFavorites = inFavorites;
  }

  /**
   * Returns a like button.
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();

    this.#addEventListener();

    return this.#element;
  }

  /**
   * Renders a like button.
   */
  #renderTemplate() {
    const context = {
      inFavorites: this.inFavorites,
    };
    this.#element = stringToHtmlElement(template(context));
  }

  /**
   * Adds listeners for a like button.
   */
  #addEventListener() {
    const el = this.#element;
    this.#element.addEventListener('click', () => el.classList.toggle('like-heart--active'));
  }
}
export default LikeButton;
