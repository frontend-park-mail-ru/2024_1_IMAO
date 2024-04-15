'use strict';

import trimString from '../../modules/trimString.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './adsCard.hbs';
import styles from './adsCard.scss';


const MAX_TITLE_LENGTH = 20;

/**
 * Render an AdsCard template.
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @param {string | number} id - Product ID in database.
 * @param {string} path - Link to the advert page.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export default function renderAdsCardTemplate(title, price, id, path) {
  const titleTrim = trimString(title, MAX_TITLE_LENGTH);

  return stringToHtmlElement(template({title, titleTrim, price, id, path}));
}
