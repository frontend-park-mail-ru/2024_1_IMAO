'use strict';

export function renderSettingsContainer(profileData) {
  Handlebars.registerHelper('is_null', function(value) {
    return value === '';
  });

  const template = Handlebars.templates['settingsContainer.hbs'];

  return template(profileData);
}
