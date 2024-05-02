'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './profileMain.hbs';
import styles from './profileMain.scss';

/**
 * Render an profile main section template.
 * @return {HTMLElement}
 */
export default function renderProfileMain() {
  return stringToHtmlElement(template());
}
