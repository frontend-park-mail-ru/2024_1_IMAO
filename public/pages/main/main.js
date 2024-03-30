'use strict';

import {renderAdsCardTemplate} from '../../components/adsCard/adsCard.js';
import ajax from '../../modules/ajax.js';

/** Class representing a main page. */
export class Main {
  #element;

  /**
   * Initialize a main page.
   * @param {*} header
   */
  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
  }

  /**
   * Render the main page.
   * @return {Element} - The element of main page.
   */
  render() {
    this.#renderTemplate();

    return this.#element;
  }

  /**
   * Render a template for a main page.
   */
  #renderTemplate() {
    this.#element.appendChild(this.header.render());

    const content = document.createElement('div');
    content.classList.add('page-content');
    this.#element.appendChild(content);

    const title = document.createElement('h1');
    title.innerHTML = 'Все объявления';
    content.appendChild(title);

    ajax.get(
        ajax.routes.main,
        (ads) => {
          const items = ads['items'];
          const adverts = items['adverts'];
          if (!(adverts && Array.isArray(adverts))) {
            return;
          }

          const cardsContainer = document.createElement('div');
          cardsContainer.classList.add('cards-container');

          adverts.forEach((inner) => {
            const {price, title} = inner;
            cardsContainer.innerHTML += renderAdsCardTemplate(title, price);
          });

          content.appendChild(cardsContainer);
        },
    );
  }
}
