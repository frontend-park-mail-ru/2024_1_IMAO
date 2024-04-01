'use strict';

/**
 * Render an CartBlock template.
 * @param {string | number} quantity - The title of the product.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export function renderCartMain(quantity) {
  const template = Handlebars.templates['cartMain.hbs'];
  return template({quantity});
}
