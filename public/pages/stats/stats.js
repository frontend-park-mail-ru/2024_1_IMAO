import StatsContainer from '../../components/stats/stats';
import ajax from '../../modules/ajax';

export class Stats {
  #element;

  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
  }

  render() {
    this.#renderTemplate();

    return this.#element;
  }

  #renderTemplate() {
    this.#element.appendChild(this.header.render());
    const page = new StatsContainer()
  }
}