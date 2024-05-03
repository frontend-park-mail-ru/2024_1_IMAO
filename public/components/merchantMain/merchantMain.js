'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './merchantMain.hbs';
import styles from './merchantMain.scss';

/**
 * Render an merchant main section template.
 * @return {HTMLElement}
 */
export default function renderMerchantMain() {
  return stringToHtmlElement(template());
}
