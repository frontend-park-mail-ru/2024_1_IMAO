'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './emptyAdvertsPlug.hbs';
import styles from './emptyAdvertsPlug.scss';


class EmptyAdvertsPlug {

    constructor(content) {
        this.content = content;
    }  
  
  render() {
    const context = {
      content: this.content,
    };
    const root = stringToHtmlElement(template(context));

    return root;
  }
}

export default EmptyAdvertsPlug;
