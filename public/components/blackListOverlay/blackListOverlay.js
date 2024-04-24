'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './blackListOverlay.hbs';
import styles from './blackListOverlay.scss';

/**
 *
 */
class BlackListOverlay {
  #element;

  /**
   *
   * @param {*} button
   */
  constructor(button) {
    this.button = button;
  }

  /**
   *
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();

    this.#addListeners();

    return this.#element;
  }

  /**
   *
   */
  #renderTemplate() {
    this.#element = stringToHtmlElement(template());
  }

  /**
   *
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
