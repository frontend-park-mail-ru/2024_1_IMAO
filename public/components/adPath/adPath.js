'use strict';

/**
 * Render an AdPath template.
 * @param {string} city - City where the product sells.
 * @param {string} category - Category of the product.
 * @param {string} name - Product name.
 * @param {URL} cityPath - Path to adverts list in city.
 * @param {URL} categoryPath - Path to adverts list in category.
 * @return {Handlebars.TemplateDelegate} - The template of path.
 */
export function renderAdPathTemplate(paths) {
  // eslint-disable-next-line no-undef
  const template = Handlebars.templates['adPath.hbs'];

  return template(paths);
}
