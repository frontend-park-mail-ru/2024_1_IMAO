'use strict';

/**
 * Render an AdPath template.
 * @param {string} city - City where the product sells.
 * @param {string} category - Category of the product.
 * @param {string} name - Product name.
 * @return {Handlebars.TemplateDelegate} - The template of path.
 */
export function renderAdPathTemplate(city, category, name) {
  const template = Handlebars.templates['adPath.hbs'];
  return template({city, category, name});
}
