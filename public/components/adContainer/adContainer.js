'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './adContainer.hbs';
import styles from './adContainer.scss';

/**
 * Render ad page.
 * @param {boolean} active
 * @param {string} title - Advert title.
 * @param {string} city - Advert city.
 * @param {string} category - Advert category.
 * @param {string} description - Description of an advert.
 * @param {string} created - Created date.
 * @param {*} price
 * @param {*} isAuthor
 * @param {*} editPath
 * @param {*} id
 * @param {*} state
 * @param {Array} photos
 * @param {*} inFavorites
 * @param {*} views
 * @param {*} favouritesNum
 * @param {bool} isPromoted
 * @param {Object} promotionData
 * @return {Handlebars.TemplateDelegate} - The tmeplate of the advert.
 */
export default function renderAdContainerTemplate(
    active,
    title,
    city,
    category,
    description,
    created,
    price,
    isAuthor,
    editPath,
    id,
    state,
    photos,
    inFavorites,
    views,
    favouritesNum,
    isPromoted,
    promotionData,
) {
  return stringToHtmlElement(
      template({
        active,
        title,
        city,
        category,
        description,
        created,
        price,
        isAuthor,
        editPath,
        id,
        state,
        photos,
        inFavorites,
        views,
        favouritesNum,
        isPromoted,
        promotionData,
      }),
  );
}
