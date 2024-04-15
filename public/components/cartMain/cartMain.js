'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './cartMain.hbs';
import styles from './cartMain.scss';

/**
 * Render an CartBlock template.
 * @param {string | number} quantity - The title of the product.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export default function renderCartMain(quantity) {
  return stringToHtmlElement(template({quantity}));
}
