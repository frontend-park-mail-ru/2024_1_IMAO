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
    this.#addListeners();

    return this.#element;
  }

   /**
   * Add event listeners for the main page.
   */
   #addListeners() {
    this.#addScrollListener();
  }

  /**
   * Add event listener for scrolling main page.
   */
  #addScrollListener() {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      if (scrollPosition + windowHeight >= documentHeight) {
        this.#renderTemplate();
      }
    });
  }

  /**
   * Render a temlate for a main page.
   */
  #renderTemplate() {
    const alreadyRendered = document.querySelector('.page-content') != null;
    const content = alreadyRendered ?
      document.querySelector('.page-content') :
      document.createElement('div');

    if (!alreadyRendered) {
      this.#element.appendChild(this.header.render());

      content.classList.add('page-content');
      this.#element.appendChild(content);

      const title = document.createElement('h1');
      title.innerHTML = 'Все объявления';
      content.appendChild(title);
    }

    const cards = document.getElementsByClassName('card');
    const startID = cards.length == 0 ?
      1 :
      parseInt(cards[cards.length - 1].dataset['id']) + 1;

    ajax.routes.main.searchParams.delete('count');
    ajax.routes.main.searchParams.delete('startId');

    ajax.routes.main.searchParams.append('count', 30);
    ajax.routes.main.searchParams.append('startId', startID);

    ajax.get(
        ajax.routes.main,
        (ads) => {
          const items = ads['items'];
          if (!(adverts && Array.isArray(adverts))) {
            return;
          }

          const cardsContainer = !alreadyRendered ?
          document.createElement('div') :
          document.querySelector('.cards-container');
        if (!alreadyRendered) {
          cardsContainer.classList.add('cards-container');
        }

          adverts.forEach((inner) => {
            const {price, title, id} = inner;
            cardsContainer.innerHTML += renderAdsCardTemplate(title, price, id);
          });

          content.appendChild(cardsContainer);
        },
    );
  }
}
