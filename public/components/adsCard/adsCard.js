'use strict';

/**
 * Render an AdsCard template.
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @param {string | number} id - Product ID in database.
 * @param {string} path - Link to the advert page.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export function renderAdsCardTemplate(title, price, id, path) {
  const template = Handlebars.templates['adsCard.hbs'];
  return template({title, price, id, path});
}
