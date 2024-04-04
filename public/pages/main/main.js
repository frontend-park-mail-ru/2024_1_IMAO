'use strict';

import {renderAdsCardTemplate} from '../../components/adsCard/adsCard.js';
import ajax from '../../modules/ajax.js';

/** Class representing a main page. */
export class Main {
  #element;
  #isBottomReached;

  /**
   * Initialize a main page.
   * @param {*} header
   */
  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
    this.#isBottomReached = false;
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
    const scrollHandler = () => {
      const position = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;

      if (position + winHeight >= docHeight && !this.#isBottomReached) {
        this.#renderTemplate();
        this.#isBottomReached = true;
      }
    };

    window.addEventListener('scroll', scrollHandler);
  }

  /**
   * Render a template for a main page.
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
        (body) => {
          const adverts = body['items'];
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
            const {price, title, id, city, category} = inner;
            const path = city + '/' + category + '/' + id;
            cardsContainer.innerHTML +=
              renderAdsCardTemplate(title, price, id, path);
          });

          content.appendChild(cardsContainer);
          this.#isBottomReached = false;
        },
    );
  }
}
