'use strict';

/**
 * Render an CartBlock template.
 * @param {string | number} quantity - The title of the product.
 * @param {string | number} priceSum - The price of the product.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export function renderSidebar(quantity, priceSum) {
  const template = Handlebars.templates['sidebar.hbs'];
  return template({quantity, priceSum});
}
