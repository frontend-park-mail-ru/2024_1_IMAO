'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './settingsContainer.hbs';
import styles from './settingsContainer.scss';

/**
 *
 * @param {*} profileData
 * @return {HTMLElement}
 */
export default function renderSettingsContainer(profileData) {
  return stringToHtmlElement(template(profileData));
}
