import StatsContainer from '../../components/stats/stats';

/**
 * Class represents a Csas statistics page.
 */
export class Stats {
  #element;

  /**
   * Constructor for statistics page.
   * @param {*} header
   */
  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
  }

  /**
   * Returns a statistics page.
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();

    return this.#element;
  }

  /**
   * Render a statistics page.
   */
  #renderTemplate() {
    this.#element.appendChild(this.header.render());
    const stats = new StatsContainer([1, 2, 3, 4]);

    this.#element.appendChild(stats.render());
  }
}
