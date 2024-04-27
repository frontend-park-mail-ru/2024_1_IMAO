import template from './stats.hbs';
import styles from './stats.scss';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';

class StatsContainer {
  #element;

  constructor(items) {
    this.items = items;
  }

  render() {
    this.#renderTemplate();
  }

  #renderTemplate() {
    this.#element = stringToHtmlElement(template(this.items));
  }
}

export default StatsContainer;
