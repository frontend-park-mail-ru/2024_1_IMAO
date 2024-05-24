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
  render() {
    this.#renderTemplate();

    this.#addListeners();

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
  #addListeners() {
    const myDialog = this.#element;
    const myButton = this.button;

    myButton.addEventListener('click', (ev) => {
      ev.preventDefault();
      myDialog.showModal();
    });

    myDialog.addEventListener('click', () => {
      myDialog.close();
    });

    const myDiv = this.#element.querySelector('.promotion-dialog__container');
    myDiv.addEventListener('click', (event) => event.stopPropagation());
  }
}

export default PromotionOverlay;
