'use strict';

export function renderMerchantCardTemplate(merchantsName, location, registrationDate, isProfileVerified, reviewCount, subscribersCount, subscribtionsCount) {
  const template = Handlebars.templates['merchantCard.hbs'];
  return template({merchantsName, location, registrationDate, isProfileVerified, reviewCount, subscribersCount, subscribtionsCount});
}