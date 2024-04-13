'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './orderMain.hbs';
import styles from './orderMain.css'; // eslint-disable-line no-unused-vars

/**
 * Render an orderIte template.
 * @param {number} num
 * @param {number} id
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export function renderOrderMain() {
  // eslint-disable-next-line no-undef
  // const template = Handlebars.templates['orderMain.hbs'];

  return stringToHtmlElement(template());
}
