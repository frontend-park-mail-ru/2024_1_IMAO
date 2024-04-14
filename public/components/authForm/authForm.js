'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './authForm.hbs';
import styles from './authForm.scss';

/**
 * Return the template function of the authForm.
 * @param {object} templateParams
 * @return {HTMLElement} - The template function.
 */
export default function renderAuthForm(templateParams) {
  return stringToHtmlElement(template(templateParams));
}
