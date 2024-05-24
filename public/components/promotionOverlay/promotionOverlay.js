'use strict';

import template from './promotionOverlay.hbs';
import './promotionOverlay.scss';
import stringToHtmlElement from '../../modules/stringToHtmlElement';

/**
 * Class represented advert promotion overlay.
 */
class PromotionOverlay {
  #element;

  /**
   * Constructor for promotion overlay.
   * @param {HTMLElement} button - Button for advert promotion.
   */
  constructor(button) {
    this.button = button;
  }

  /**
   * Renders promotion overlay.
   * @return {HTMLElement} - Promotion overlay.
   */
  async render() {
    this.#renderTemplate();

    //await this.#addListeners();

    return this.#element;
  }

  /**
   * Renders promotion overlay template.
   */
  #renderTemplate() {
    this.#element = stringToHtmlElement(template());
  }

  /**
   * Add event listeners for promotion overlay.
   */
  async #addListeners() {

  }
}

export default PromotionOverlay;
