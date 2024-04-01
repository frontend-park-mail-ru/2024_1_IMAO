'use strict';

import {renderAdPathTemplate} from '../../components/adPath/adPath.js';
import ajax from '../../modules/ajax.js';

/** Class representing advert page. */
export class Advert {
  #element;

  /**
   * Initialize the advert page.
   * @param {*} header
   */
  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
  }

  /**
   * Render the advert Page.
   * @return {Element} - The advert page.
   */
  render() {
    this.#renderTemplate();

    return this.#element;
  }

  /**
   * Render the advert page template.
   */
  #renderTemplate() {
    const content = document.createElement('div');

    this.#element.appendChild(this.header.render());

    content.classList.add('page-content');
    this.#element.appendChild(content);

    const apiRoute = ajax.routes.ADVERT.GET_ADVERT;

    ajax.get(
        apiRoute,
        (body) => {
          const items = body['items'];
          const advert = items['advert'];
          const city = items['city'];
          const category = items['category'];

          const adTitle = advert['title'];
          const cityName = city['name'];
          const catName = category['name'];

          const adPath = document.createElement('div');
          adPath.innerHTML = renderAdPathTemplate(cityName, catName, adTitle);
          content.appendChild(adPath);

          const title = document.createElement('h1');
          title.innerHTML = adTitle;
          content.appendChild(title);
        });
  }
}
