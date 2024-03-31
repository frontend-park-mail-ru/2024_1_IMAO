'use strict';

export function renderMerchantPageTitleTemplate(userName, urlMainPage) {
  const template = Handlebars.templates['merchantPageTitle.hbs'];
  return template({userName, urlMainPage});
}