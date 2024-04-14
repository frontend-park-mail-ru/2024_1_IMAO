'use strict';

import ratingCalculation from '../../modules/ratingCalculation.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './ratingBar.hbs';
import styles from './ratingBar.scss';

/**
 *
 */
class RatingBar {
  /**
   *
   * @param {*} ratingValue
   */
  constructor(ratingValue) {
    this.ratingValue = ratingValue;
    this.items = {};
  }

  /**
   *
   * @return {HTMLElement}
   */
  render() {
    this.items = ratingCalculation(this.ratingValue);

    const context = {
      ratingValue: this.ratingValue,
      items: this.items,
    };
    const root = stringToHtmlElement(template(context));

    return root;
  }
}

export default RatingBar;
