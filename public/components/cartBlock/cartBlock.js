'use strict';

import trimString from '../../modules/trimString.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './cartBlock.hbs';
import styles from './cartBlock.css'; // eslint-disable-line no-unused-vars

const MAX_TITLE_LENGTH = 40;

/**
 * Render an CartBlock template.
 * @param {number} id
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @param {string} path
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export function renderCartBlock(id, title, price, path) {
  // eslint-disable-next-line no-undef
  // const template = Handlebars.templates['cartBlock.hbs'];
  title = trimString(title, MAX_TITLE_LENGTH);

  return stringToHtmlElement(template({id, title, price, path}));
}
