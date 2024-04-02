'use strict';

/**
 * Render an CartBlock template.
 * @param {number} id
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export function renderCartBlock(id, title, price) {
  const template = Handlebars.templates['cartBlock.hbs'];
  return template({id, title, price});
}