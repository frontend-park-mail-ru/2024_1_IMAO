'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './settingsContainer.hbs';
import styles from './settingsContainer.scss';
import Handlebars from 'handlebars';

/**
 *
 * @param {Object} profileData - Information about profile.
 * @return {HTMLElement} - Settings form.
 */
export default function renderSettingsContainer(profileData) {
  Handlebars.registerHelper('is_null', function(value) {
    return value === '';
  });

  return stringToHtmlElement(template(profileData));
}
