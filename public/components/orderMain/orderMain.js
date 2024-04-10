'use strict';

/**
 * Render an orderIte template.
 * @param {number} num
 * @param {number} id
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export function renderOrderMain() {
  // eslint-disable-next-line no-undef
  const template = Handlebars.templates['orderMain.hbs'];

  return template({});
}
