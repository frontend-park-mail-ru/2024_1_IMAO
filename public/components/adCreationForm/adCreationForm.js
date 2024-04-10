'use strict';

/**
 * Render ad creation form page.
 * @param {String} btn
 * @param {String} title
 * @param {String} price
 * @param {String} description
 * @param {String} city
 * @param {boolean} create
 * @return {Handlebars.TemplateDelegate} - The tmeplate of the ad creation form.
 */
export function renderAdCreationForm(create, title, price, description, city) {
  // eslint-disable-next-line no-undef
  const template = Handlebars.templates['adCreationForm.hbs'];

  return template({title, price, description, city, create});
}
