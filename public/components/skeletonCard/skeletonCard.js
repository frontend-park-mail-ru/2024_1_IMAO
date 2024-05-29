'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './skeletonCard.hbs';
import styles from './skeletonCard.scss';

/**
 * Represents a skeleton card.
 */
class SkeletonCard {
  /**
   * Renders a skeleton card template.
   * @return {HTMLElement}
   */
  render() {
    const context = {};
    const root = stringToHtmlElement(template(context));

    return root;
  }
}

export default SkeletonCard;
