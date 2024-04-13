'use strict';

/**
 *
 * @param {*} profileData
 * @return {HTMLElement}
 */
export default function renderSettingsContainer(profileData) {
  // eslint-disable-next-line no-undef
  Handlebars.registerHelper('is_null', function(value) {
    return value === '';
  });

  // eslint-disable-next-line no-undef
  const template = Handlebars.templates['settingsContainer.hbs'];

  return template(profileData);
}
