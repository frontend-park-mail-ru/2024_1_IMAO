'use strict';
import template from './merchantPageTitle.hbs';
import styles from './merchantPageTitle.css'; // eslint-disable-line no-unused-vars
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';

/**
 *
 */
class MerchantPageTitle {
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
    const context = {
      userName: this.items.merchantsName,
      urlMainPage: this.items.urlMain,
    };
    const root = stringToHtmlElement(template(context));

    return root;
  }
}

export default MerchantPageTitle;
