'use strict';

import {CATEGORIES} from '../../config/config.js';
import AdsCard from '../../components/adsCard/adsCard.js';
import SkeletonCard from '../../components/skeletonCard/skeletonCard.js';
import renderIframe from '../../components/iframe/iframe.js';
import EmptyAdvertsPlug from '../../components/emptyAdvertsPlug/emptyAdvertsPlug.js';
import {getURLFromLocation, buildURL, parsePathParams, buildURLBySegments} from '../../modules/parsePathParams.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';

/** Class representing a main page. */
export class Main {
  #slug;
  #element;
  #isBottomReached;
  #title;

  /**
   * Initialize a main page.
   * @param {*} header
   */
  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
    this.#isBottomReached = false;
    this.#title = null;
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
      if (document.querySelector('.cards-container') != null) {
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
    let apiRoute = '';
    const titleValue = url.searchParams.get('title');
    if (titleValue !== null) {
      this.#title = titleValue;
      apiRoute = new URL(ajax.routes.ADVERT.SEARCH.href);
      apiRoute.searchParams.set('title', titleValue);
    } else {
      this.#slug = parsePathParams(router.routes.adsListByCategory.href, url);
      if (this.#slug.city === '') {
        apiRoute = buildURL(ajax.routes.ADVERT.GET_ADS_LIST, this.#slug);
      } else if (this.#slug.category === undefined) {
        apiRoute = buildURL(ajax.routes.ADVERT.GET_ADS_LIST_BY_CITY, this.#slug);
      } else {
        apiRoute = buildURL(ajax.routes.ADVERT.GET_ADS_LIST_BY_CATEGORY, this.#slug);
      }
    }

    apiRoute.searchParams.delete('count');
    apiRoute.searchParams.delete('startId');

    apiRoute.searchParams.append('count', 30);
    apiRoute.searchParams.append('startId', startID);

    return apiRoute;
  }

  /**
   * Catches iframe close signale.
   */
  #closeIframe() {
    const iframe = this.#element.querySelector('[id="iframe"]');
    window.onmessage = function(event) {
      if (event.data == 'reply') {
        iframe.hidden = !iframe.hidden;
      }
    };
  }

  /**
   * Render a template for a main page.
   */
  #renderTemplate() {
    const alreadyRendered = document.querySelector('.page-content') != null;
    const content = alreadyRendered ? document.querySelector('.page-content') : document.createElement('div');
    const cardsContainerSkeleton = alreadyRendered ? null : document.createElement('div');
    const cards = document.getElementsByClassName('card');
    const startID = cards.length == 0 ? 1 : parseInt(cards[cards.length - 1].dataset['id']) + 1;
    const apiRoute = this.#getRoute(startID);

    if (!alreadyRendered) {
      this.#element.appendChild(this.header.render());

      content.classList.add('page-content');
      this.#element.appendChild(content);

      const title = document.createElement('h1');
      if (this.#slug.category !== undefined) {
        for (const category of CATEGORIES) {
          if (category.translation !== this.#slug.category) {
            continue;
          }
          document.title += ' - ' + category.name;
          title.innerHTML = category.name;
        }
      } else if (this.#title !== null) {
        document.title += ' - ' + this.#title;
        title.innerHTML = `Объявления по запросу «${this.#title}»`;
      } else {
        title.innerHTML = 'Все объявления';
      }
      content.appendChild(title);

      cardsContainerSkeleton.classList.add('cards-container-skeleton');

      for (let i = 0; i < 20; i++) {
        const adsCardSkeletonInstance = new SkeletonCard();
        cardsContainerSkeleton.appendChild(adsCardSkeletonInstance.render());
      }

      content.appendChild(cardsContainerSkeleton);

      const apiRoute = ajax.routes.SURVEY.CHECK;
      ajax.get(apiRoute, (body) => {
        if (body?.isChecked === undefined) {
          return;
        }
        if (body.isChecked) {
          return;
        }
        const iframeRoute = router.routes.csatPage.href.href;
        this.#element.appendChild(renderIframe(iframeRoute));
        const iframe = this.#element.querySelector('[id="iframe"]');
        setTimeout(() => {
          iframe.hidden = !iframe.hidden;
        }, 120000);
        this.#closeIframe();
      });
    }

    ajax.get(apiRoute, (body) => {
      const adverts = body['items'];

      if (!(adverts && Array.isArray(adverts))) {
        const content = {
          header: 'Ничего не найдено',
          content: '',
        };
        const emptyAdvertsPlug = new EmptyAdvertsPlug(content).render();
        const plugText = emptyAdvertsPlug.querySelector('.empty-adverts-message-text');
        plugText.innerHTML = 'Мы не нашли то, что вы искали.<br/>Попробуйте изменить условие поиска или категорию.';
        cardsContainerSkeleton.replaceWith(emptyAdvertsPlug);

        return;
      }

      const cardsContainer = !alreadyRendered ?
        document.createElement('div') :
        document.querySelector('.cards-container');
      cardsContainer.classList.add('cards-container');

      const ids = [];
      adverts.forEach((inner) => {
        const {price, title, id, inFavourites, city, category, photosIMG} = inner;
        ids.push(id);
        const path = buildURLBySegments(router.host, [city, category, id]);
        const adsCardInstance = new AdsCard(title, price, id, inFavourites, path, photosIMG);
        cardsContainer.appendChild(adsCardInstance.render());
      });

      if (!cardsContainerSkeleton) {
        content.appendChild(cardsContainer);
      } else {
        cardsContainerSkeleton.replaceWith(cardsContainer);
      }

      this.#isBottomReached = false;

      ids.forEach((id) => {
        const address = this.#element.querySelector(`[id="${id}"]`);
        address.addEventListener('click', (ev) => {
          if (ev.target.matches('path') || ev.target.matches('svg') || ev.target.matches('.like-icon')) {
            return;
          }
          router.pushPage(ev, address.href);
        });
      });
    });
  }
}
