'use strict';
import template from './ratingBar.hbs';
import styles from './ratingBar.css'; //eslint-disable-line no-unused-vars
import { StringToHtmlElement } from '../../modules/stringToHtmlElement.js';
import { RatingCalculation } from '../../modules/ratingCalculation.js';

class RatingBar {
  constructor(ratingValue){
      this.ratingValue = ratingValue;
      this.items = {};
  }

  render() {
      this.items = RatingCalculation(this.ratingValue);

      const context = {
          ratingValue : this.ratingValue,
          items: this.items
      };
      const root = StringToHtmlElement(template(context));


      return root;
  }
}

export default RatingBar;  