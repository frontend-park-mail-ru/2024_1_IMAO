'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './promotionInfo.hbs';

/**
 * Render ad page.
 * @param {Object} promotionData
 * @return {Handlebars.TemplateDelegate} - The tmeplate of the advert.
 */
export default function renderPromotionInfo(promotionData) {
  return stringToHtmlElement(template(promotionData));
}
