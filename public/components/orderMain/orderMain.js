'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './orderMain.hbs';
import styles from './orderMain.scss';

/**
 * Render an order main section template.
 * @param {number} num
 * @param {number} id
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export default function renderOrderMain() {
  return stringToHtmlElement(template());
}
