'use strict';


export function renderActiveSoldSwitchTemplate(switched, activeAds, soldAds) {
  const template = Handlebars.templates['activeSoldSwitch.hbs'];
  return template({switched, activeAds, soldAds});
}