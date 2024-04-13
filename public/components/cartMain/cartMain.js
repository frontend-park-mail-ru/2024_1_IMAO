'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './cartMain.hbs';
import styles from './cartMain.css'; // eslint-disable-line no-unused-vars

/**
 * Render an CartBlock template.
 * @param {string | number} quantity - The title of the product.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export function renderCartMain(quantity) {
  // eslint-disable-next-line no-undef
  // const template = Handlebars.templates['cartMain.hbs'];

  return stringToHtmlElement(template({quantity}));
}
