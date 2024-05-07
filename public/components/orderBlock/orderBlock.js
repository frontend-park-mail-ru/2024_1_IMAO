'use strict';

import trimString from '../../modules/trimString.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './orderBlock.hbs';
import styles from './orderBlock.scss';

const MAX_TITLE_LENGTH = 40;

/**
 * Render an CartBlock template.
 * @param {number} id
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @param {string} status
 * @param {string} photo
 * @param {string} adress
 * @param {string} phone
 * @param {string} name
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export default function renderOrderBlock(id, title, price, status, photo, adress, phone, name) {
  title = trimString(title, MAX_TITLE_LENGTH);

  return stringToHtmlElement(template({id, title, price, status, photo, adress, phone, name}));
}
