'use strict'

export function renderAdsCardTamplate(title, price){
    const template = Handlebars.templates['adsCard.hbs'];
    return template({title, price});
}