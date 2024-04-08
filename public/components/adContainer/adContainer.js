'use strict';

/**
 * Render ad page.
 * @param {string} title - Advert title.
 * @param {string} city - Advert city.
 * @param {string} category - Advert category.
 * @param {string} description - Description of an advert.
 * @param {string} created - Created date.
 * @return {Handlebars.TemplateDelegate} - The tmeplate of the advert.
 */
export function renderAdContainerTemplate(title, city, category, description,
    created, price) {
  const template = Handlebars.templates['adContainer.hbs'];

  return template({title, city, category, description, created, price});
}
