'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './iframe.hbs';
import styles from './iframe.scss';

/**
 * Render an CartBlock template.
 * @param {*} route
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export default function renderIframe(route) {
  return stringToHtmlElement(template({route}));
}
