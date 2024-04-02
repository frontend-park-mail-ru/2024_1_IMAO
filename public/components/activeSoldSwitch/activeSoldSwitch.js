'use strict';


export function renderActiveSoldSwitchTemplate(items) {
  const template = Handlebars.templates['activeSoldSwitch.hbs'];
  return template({items});
}