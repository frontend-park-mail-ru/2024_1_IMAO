'use strict';

import {CATEGORIES} from '../../config/config.js';
import AdsCard from '../../components/adsCard/adsCard.js';
import renderLoadingSpinner from '../../components/loadingSpinner/loadingSpinner.js';
import SkeletonCard from '../../components/skeletonCard/skeletonCard.js';
import renderIframe from '../../components/iframe/iframe.js';
import EmptyAdvertsPlug from '../../components/emptyAdvertsPlug/emptyAdvertsPlug.js';
import {getURLFromLocation, buildURL, parsePathParams, buildURLBySegments} from '../../modules/parsePathParams.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';

const ADVERTS_SEND_COUNT = 20;
// Показывает за сколько пикселей до конца стрвницы начинается подгрузка новых объявлений.
const LOADING_GAP = 200;

/** Class representing a main page. */
export class Main {
  #slug;
  #element;
  #isBottomReached;
  #title;
  #path;
  #queryStartId;
  #scrollHandler;

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
    this.#path = null;
    this.#queryStartId = NaN;
    this.#addListeners();
  }

  /**
   * Render the main page.
   * @return {Element} - The element of main page.
   */
  render() {
    this.#getSlug();
    this.#renderTemplate();

    return this.#element;
  }

  /**
   * Add event listeners for the main page.
   */
  #addListeners() {
    this.#addScrollListener();
  }

  #scrollhandler;
  /**
   * Add event listener for scrolling main page.
   */
  #addScrollListener() {
    const scrollHandler = () => {
      if (this.#element.querySelector('.cards-container') != null) {
        const position = window.scrollY;
        const winHeight = window.innerHeight;
        const docHeight = document.body.scrollHeight;

        if (position + winHeight >= docHeight - LOADING_GAP && !this.#isBottomReached) {
          this.#isBottomReached = true;
          this.#renderTemplate();
        }
      }
    };

    window.addEventListener('scroll', scrollHandler);
  }

  /**
   * Get slug parameters from URL.
   */
  #getSlug() {
    this.#path = window.location.href;
    const url = getURLFromLocation(this.#path, router.host);
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

    apiRoute.searchParams.append('count', ADVERTS_SEND_COUNT);
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
  async #renderTemplate() {
    const alreadyRendered = this.#element.querySelector('.page-content') != null;
    const content = alreadyRendered ? this.#element.querySelector('.page-content') : document.createElement('div');
    const cardsContainerSkeleton = alreadyRendered ? null : document.createElement('div');
    const cards = this.#element.getElementsByClassName('card');
    const startID = cards.length == 0 ? 1 : parseInt(cards[cards.length - 1].dataset['id']) + 1;
    if (this.#queryStartId === startID) {
      return;
    }
    this.#queryStartId = startID;
    const apiRoute = this.#getRoute(startID);
    let contentLoaderSpinner = null;

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

      for (let i = 0; i < ADVERTS_SEND_COUNT; i++) {
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
    } else {
      contentLoaderSpinner = renderLoadingSpinner();
      this.#element.appendChild(contentLoaderSpinner);
    }

    await ajax.get(apiRoute, (body) => {
      const adverts = body['items'];

      if (contentLoaderSpinner !== null) {
        this.#element.removeChild(contentLoaderSpinner);
      }

      if (!(adverts && Array.isArray(adverts))) {
        if (!cardsContainerSkeleton) {
          const endMessage = document.createElement('div');
          endMessage.classList.add('page-content__end-message');
          endMessage.innerHTML = 'Попробуйте изменить условие поиска или категорию.';
          content.appendChild(endMessage);

          return;
        }

        const context = {
          header: 'Ничего не найдено',
          content: '',
        };
        const emptyAdvertsPlug = new EmptyAdvertsPlug(context).render();
        const plugText = emptyAdvertsPlug.querySelector('.empty-adverts__text');
        plugText.innerHTML = 'Мы не нашли то, что вы искали.<br/>Попробуйте изменить условие поиска или категорию.';
        cardsContainerSkeleton.replaceWith(emptyAdvertsPlug);

        return;
      }

      const cardsContainer = !alreadyRendered ?
        document.createElement('div') :
        this.#element.querySelector('.cards-container');
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
