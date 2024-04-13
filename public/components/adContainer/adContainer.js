'use strict';

/**
 * Render ad page.
 * @param {string} title - Advert title.
 * @param {string} city - Advert city.
 * @param {string} category - Advert category.
 * @param {string} description - Description of an advert.
 * @param {string} created - Created date.
 * @param {*} price
 * @param {*} isAuthor
 * @param {*} editPath
 * @param {*} id
 * @return {Handlebars.TemplateDelegate} - The tmeplate of the advert.
 */
export function renderAdContainerTemplate(title, city, category, description,
    created, price, isAuthor, editPath, id) {
  // eslint-disable-next-line no-undef
  const template = Handlebars.templates['adContainer.hbs'];

  return template({title, city, category, description, created, price,
    isAuthor, editPath, id});
}
