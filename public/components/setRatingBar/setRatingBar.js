'use strict';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './setRatingBar.hbs';
import styles from './setRatingBar.scss';
import ajax from '../../modules/ajax.js';
import RatingBar from '../ratingBar/ratingBar.js';

/**
 * Render bar for setting rating.
 */
class SetRatingBar {
  #element;

  /**
   *
   */
  #addRatingListeners() {
    const stars = this.#element.querySelectorAll('.set-star');
    for (let i = 0; i < 5; ++i) {
      stars[i].addEventListener('click', () => {
        for (let j = 4; j >= i; --j) {
          stars[j].classList.add('setted-star');
        }
        for (let j = 0; j < 5; ++j) {
          stars[j].classList.add('disabled-star');
        }

        const currentID = this.#element.dataset['count'];
        const title = document.querySelectorAll('.order-block__rating--text')[currentID];
        title.style.display = 'none';

        const rating = parseInt(stars[i].dataset['id']);
        const advertId = parseInt(title.dataset['id']);
        const body = {rating, advertId};
        ajax.post(ajax.routes.ORDER.CREATE_REVIEW, body, () => {
          const oldRatingBar = document.querySelectorAll('.order-block__rating')[currentID];
          const ratingBar = new RatingBar(rating);
          oldRatingBar.replaceWith(ratingBar.render());
        });
      });
    }
  }

  /**
   * @param {number} count
   * @return {HTMLElement}
   */
  render(count) {
    this.#element = stringToHtmlElement(template({count}));
    this.#addRatingListeners();

    return this.#element;
  }
}

export default SetRatingBar;
