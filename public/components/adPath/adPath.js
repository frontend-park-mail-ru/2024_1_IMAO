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
export function renderAdPathTemplate(city, category, name,
    cityPath, categoryPath) {
  const template = Handlebars.templates['adPath.hbs'];
  return template({city, category, name, cityPath, categoryPath});
}
