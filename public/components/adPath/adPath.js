'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './adPath.hbs';
import styles from './adPath.scss';


/**
 * Render an AdPath template.
 * @param {object} paths - Array of paths and their names.
 * @return {HTMLElement} - The template of path.
 */
export default function renderAdPathTemplate(paths) {
  return stringToHtmlElement(template(paths));
}
