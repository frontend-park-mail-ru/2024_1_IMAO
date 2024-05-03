'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './emptyOrderPlug.hbs';
import styles from './emptyOrderPlug.scss';

/**
 * Class reprenents a plug for no orders.
 */
class EmptyOrderPlug {
  /**
   * Constructor for plug.
   * @param {HTMLElement} header
   * @param {string} content
   */
  constructor(header, content) {
    this.header = header;
    this.content = content;
  }

  /**
   * Returns a plug.
   * @return {HTMLElement}
   */
  render() {
    const context = {
      header: this.header,
      content: this.content,
    };
    const root = stringToHtmlElement(template(context));

    return root;
  }
}

export default EmptyOrderPlug;
