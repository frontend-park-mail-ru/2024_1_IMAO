'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './profileMain.hbs';
import styles from './profileMain.css'; // eslint-disable-line no-unused-vars

/**
 * Render an orderIte template.
 * @return {HTMLElement}
 */
export function renderProfileMain() {
  // eslint-disable-next-line no-undef
  // const template = Handlebars.templates['orderMain.hbs'];

  return stringToHtmlElement(template());
}
