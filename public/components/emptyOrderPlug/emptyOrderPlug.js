'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './emptyOrderPlug.hbs';
import styles from './emptyOrderPlug.scss';


class EmptyOrderPlug {

    constructor(header, content) {
        this.header = header;
        this.content = content;
    }  
  
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
