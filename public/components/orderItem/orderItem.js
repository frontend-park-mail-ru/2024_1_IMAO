'use strict';

/**
 * Render an orderIte template.
 * @param {number} num
 * @param {number} id
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export function renderOrderItem(num, id, title, price) {
  const template = Handlebars.templates['orderItem.hbs'];
  return template({num, id, title, price});
}
