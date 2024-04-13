'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './authForm.hbs';
import styles from './authForm.css'; // eslint-disable-line no-unused-vars

/**
 * Return the template function of the authForm.
 * @param {object} templateParams
 * @return {HTMLElement} - The template function.
 */
export default function renderAuthForm(templateParams) {
  // eslint-disable-next-line no-undef
  // return Handlebars.templates['authForm.hbs'];
  return stringToHtmlElement(template(templateParams));
}
