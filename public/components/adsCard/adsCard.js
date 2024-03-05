'use strict';

/**
 * Render an AdsCard template.
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @returns {Handlebars.TemplateDelegate} - The template of card.
 */
export function renderAdsCardTamplate(title, price){
    const template = Handlebars.templates['adsCard.hbs'];
    return template({title, price});
}
