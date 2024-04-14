'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './sidebar.hbs';
import styles from './sidebar.scss';

/**
 * Render an CartBlock template.
 * @param {string | number} quantity - The title of the product.
 * @param {string | number} priceSum - The price of the product.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export default function renderSidebar(quantity, priceSum) {
  return stringToHtmlElement(template({quantity, priceSum}));
}
