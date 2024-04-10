'use strict';

import { trimString } from '../../modules/trimString.js';

const MAX_TITLE_LENGTH = 40;

/**
 * Render an CartBlock template.
 * @param {number} id
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export function renderCartBlock(id, title, price, path) {
  const template = Handlebars.templates['cartBlock.hbs'];
  title = trimString(title, MAX_TITLE_LENGTH);

  return template({id, title, price, path});
}
