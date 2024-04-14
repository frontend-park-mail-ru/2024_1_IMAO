'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './adCreationForm.hbs';
import styles from './adCreationForm.scss';


/**
 * Render ad creation form page.
 * @param {boolean} create
 * @param {String} title
 * @param {String} price
 * @param {String} description
 * @param {String} city
 * @return {Handlebars.TemplateDelegate} - The tmeplate of the ad creation form.
 */
export default function renderAdCreationForm(create, title, price, description, city) {
  return stringToHtmlElement(template({title, price, description, city, create}));
}
