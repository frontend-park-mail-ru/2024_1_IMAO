'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './skeletonCard.hbs';
import styles from './skeletonCard.scss';


class SkeletonCard {


  render() {
    const context = {

    };
    const root = stringToHtmlElement(template(context));

    return root;
  }
}

export default SkeletonCard;
