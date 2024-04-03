'use strict';
import template from './horizontalButtonGroup.hbs';
import styles from './horizontalButtonGroup.css'; //eslint-disable-line no-unused-vars
import { StringToHtmlElement } from '../../modules/stringToHtmlElement.js';

class HorizontalButtonGroup { 
  constructor(items){
      this.items = items;
  }

  render() {
      const context = {
          items: this.items
      };
      const root = StringToHtmlElement(template(context));

      return root;
  }
}

export default HorizontalButtonGroup; 