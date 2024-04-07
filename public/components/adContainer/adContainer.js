'use strict';

/**
 * Render ad page.
 * @param {*} title - Advert title.
 * @param {*} city - Advert city.
 * @param {*} category - Advert category.
 * @param {*} description - Description of an advert.
 * @param {*} created - Created date.
 * @return {Handlebars.TemplateDelegate} - The tmeplate of the advert.
 */
export function renderAdContainerTemplate(title, city, category, description,
    created) {
  const template = Handlebars.templates['adContainer.hbs'];
  return template({title, city, category, description, created});
}
