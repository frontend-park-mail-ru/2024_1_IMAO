'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './horizontalButtonGroup.hbs';
import styles from './horizontalButtonGroup.scss';

/**
 *
 */
class HorizontalButtonGroup {
  #element;
  /**
   *
   * @param {*} items
   */
  constructor(items) {
    this.items = items;
  }

  /**
   *
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();
    // this.#addListeners();

    return this.#element;
  }

  /**
   *
   */
  #renderTemplate() {
    const context = {
      items: this.items,
    };
    this.#element = stringToHtmlElement(template(context));
  }

  // #addListeners() {
  //     const inputs = this.#element.querySelectorAll('.ActiveSoldList input[type="radio"]');

  //     inputs.forEach(input => {
  //         input.addEventListener('click', this.handleClick);
  //     });
  // }

  // #handleClick(event) {
  //     console.log(event.target.value);
  // }
}

export default HorizontalButtonGroup;
