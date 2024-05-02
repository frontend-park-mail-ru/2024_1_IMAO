'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './horizontalButtonGroup.hbs';
import styles from './horizontalButtonGroup.scss';

/**
 * Class represents a state buttons.
 */
class HorizontalButtonGroup {
  #element;

  /**
   * Constructor for a state button group.
   * @param {object} items
   */
  constructor(items) {
    this.items = items;
  }

  /**
   * Returns a state button group.
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();
    // this.#addListeners();

    return this.#element;
  }

  /**
   * Renders a state button group.
   */
  #renderTemplate() {
    const context = {
      items: this.items,
    };
    this.#element = stringToHtmlElement(template(context));
  }
}

export default HorizontalButtonGroup;
