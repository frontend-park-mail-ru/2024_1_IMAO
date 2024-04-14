'use strict';

import trimString from '../../modules/trimString.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './orderItem.hbs';
import styles from './orderItem.scss';

const MAX_TITLE_LENGTH = 40;

/**
 * Render an orderIte template.
 * @param {number} num
 * @param {number} id
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export default function renderOrderItem(num, id, title, price) {
  title = trimString(title, MAX_TITLE_LENGTH);

  return stringToHtmlElement(template({num, id, title, price}));
}
