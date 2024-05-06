'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './emptyAdvertsPlug.hbs';
import styles from './emptyAdvertsPlug.scss';

/**
 * Class reprenents a plug for no adverts.
 */
class EmptyAdvertsPlug {
  /**
   * Constructor for plug.
   * @param {string} content
   */
  constructor(content) {
    this.content = content;
  }

  /**
   * Returns a plug.
   * @return {HTMLElement}
   */
  render() {
    const root = stringToHtmlElement(template(this.content));

    return root;
  }
}

export default EmptyAdvertsPlug;
