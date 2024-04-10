'use strict';

import {renderAdsCardTemplate} from '../../components/adsCard/adsCard.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';
import {getURLFromLocation, buildURL} from '../../modules/parsePathParams.js';
import {parsePathParams} from '../../modules/parsePathParams.js';
import {buildURLBySegments} from '../../modules/parsePathParams.js';

/** Class representing a main page. */
export class Main {
  #slug;
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
    this.#getSlug();
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
      if (document.querySelector('.cards-container') != null ) {
        const position = window.scrollY;
        const winHeight = window.innerHeight;
        const docHeight = document.body.scrollHeight;

        if (position + winHeight >= docHeight && !this.#isBottomReached) {
          this.#renderTemplate();
          this.#isBottomReached = true;
        }
      }
    };

    window.addEventListener('scroll', scrollHandler);
  }

  /**
   * Get slug parameters from URL.
   */
  #getSlug() {
    const url = getURLFromLocation(window.location.href, router.host);
    this.#slug = parsePathParams(router.routes.adsListByCategory.href, url);
  }

  /**
   * Build API URL from slug parameters in path.
   * @param {int} startID - Start ID in database.
   * @return {URL} - Route in API.
   */
  #getRoute(startID) {
    const url = getURLFromLocation(window.location.href, router.host);
    this.#slug = parsePathParams(router.routes.adsListByCategory.href, url);
    let apiRoute = '';
    if (this.#slug.city === '') {
      apiRoute = buildURL(ajax.routes.ADVERT.GET_ADS_LIST, this.#slug);
    } else if (this.#slug.category === undefined) {
      apiRoute = buildURL(ajax.routes.ADVERT.GET_ADS_LIST_BY_CITY, this.#slug);
    } else {
      apiRoute = buildURL(ajax.routes.ADVERT.GET_ADS_LIST_BY_CATEGORY,
          this.#slug);
    }

    apiRoute.searchParams.delete('count');
    apiRoute.searchParams.delete('startId');

    apiRoute.searchParams.append('count', 30);
    apiRoute.searchParams.append('startId', startID);

    return apiRoute;
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

    const apiRoute = this.#getRoute(startID);
    ajax.get(
        apiRoute,
        (body) => {
          const adverts = body['items'];
          // console.log(adverts);
          if (!(adverts && Array.isArray(adverts))) {
            return;
          }

          const cardsContainer = !alreadyRendered ?
            document.createElement('div') :
            document.querySelector('.cards-container');
          if (!alreadyRendered) {
            cardsContainer.classList.add('cards-container');
          }

          const ids = [];

          adverts.forEach((inner) => {
            const {price, title, id, city, category} = inner;
            ids.push(id);
            const path = buildURLBySegments(router.host, [city, category, id]);
            cardsContainer.innerHTML +=
              renderAdsCardTemplate(title, price, id, path);
          });

          content.appendChild(cardsContainer);
          this.#isBottomReached = false;

          ids.forEach((id) => {
            const address = this.#element.querySelector(`[id="${id}"]`);
            // console.log(id);
            // console.log(address);
            address.addEventListener('click', (ev) => {
              router.pushPage(ev, address.href);
            });
          });
        });
  }
}
