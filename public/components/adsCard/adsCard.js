'use strict';

/**
 * Render an AdsCard template.
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @param {string | number} id - Product ID in database.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export function renderAdsCardTemplate(title, price, id) {
  const template = Handlebars.templates['adsCard.hbs'];
  return template({title, price, id});
}
