'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './loadingSpinner.hbs';
import styles from './loadingSpinner.scss';

/**
 * Render a page loading spinner.
 * @return {Handlebars.TemplateDelegate} - The tmeplate of the ad creation form.
 */
export default function renderLoadingSpinner() {
  return stringToHtmlElement(template({}));
}
