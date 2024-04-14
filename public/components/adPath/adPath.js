'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './adPath.hbs';
import styles from './adPath.scss';


/**
 * Render an AdPath template.
 * @param {string} city - City where the product sells.
 * @param {string} category - Category of the product.
 * @param {string} name - Product name.
 * @param {URL} cityPath - Path to adverts list in city.
 * @param {URL} categoryPath - Path to adverts list in category.
 * @return {Handlebars.TemplateDelegate} - The template of path.
 */
export default function renderAdPathTemplate(city, category, name, cityPath, categoryPath) {
  return stringToHtmlElement(template({city, category, name, cityPath, categoryPath}));
}
