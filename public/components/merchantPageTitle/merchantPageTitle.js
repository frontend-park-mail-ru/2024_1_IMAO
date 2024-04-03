'use strict';
import template from './merchantPageTitle.hbs';
import styles from './merchantPageTitle.css'; //eslint-disable-line no-unused-vars
import { StringToHtmlElement } from '../../modules/stringToHtmlElement.js';


class MerchantPageTitle {
  constructor(items){
      this.items = items;
  }

  render() {
      const context = {
          userName : this.items.merchantsName,
          urlMainPage: this.items.urlMain
      };
      const root = StringToHtmlElement(template(context));

      return root;
  }
}

export default MerchantPageTitle;  