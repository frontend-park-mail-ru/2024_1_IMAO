'use strict';

/**
 * Render ad creation form page.
 * @return {Handlebars.TemplateDelegate} - The tmeplate of the ad creation form.
 */
export function renderAdCreationForm() {
  const template = Handlebars.templates['adCreationForm.hbs'];
  return template({});
}
