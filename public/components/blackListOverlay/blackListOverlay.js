'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './blackListOverlay.hbs';
import styles from './blackListOverlay.scss';

/**
 * Class represented an overlay to add into blacklist.
 */
class BlackListOverlay {
  #element;

  /**
   * Constructor for overlay.
   * @param {*} button
   */
  constructor(button) {
    this.button = button;
  }

  /**
   * Returns an overlay.
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();

    this.#addListeners();

    return this.#element;
  }

  /**
   * Renders an overlay.
   */
  #renderTemplate() {
    this.#element = stringToHtmlElement(template());
  }

  /**
   * Add listeners for overlay.
   */
  #addListeners() {
    const myButton = this.button;
    myButton.addEventListener('click', () => {
      myDialog.showModal();
    });

    const myDialog = this.#element;
    myDialog.addEventListener('click', () => {
      myDialog.close();
    });

    const myDiv = this.#element.querySelector('.blacklist-container');
    myDiv.addEventListener('click', (event) => event.stopPropagation());

    const blockBtn = this.#element.querySelector('.action-button-blacklist');
    blockBtn.addEventListener('click', (event) => myDialog.close());

    const cancelBtn = this.#element.querySelector('.cancel-button-blacklist');
    cancelBtn.addEventListener('click', (event) => myDialog.close());
  }
}

export default BlackListOverlay;
