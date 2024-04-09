'use strict';

import {renderAdPathTemplate} from '../../components/adPath/adPath.js';
/* eslint-disable-next-line max-len */
import {renderAdContainerTemplate} from '../../components/adContainer/adContainer.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';
import {parsePathParams, buildURL} from '../../modules/parsePathParams.js';
import {getURLFromLocation} from '../../modules/parsePathParams.js';
import {buildURLBySegments} from '../../modules/parsePathParams.js';
import {convertDate} from '../../modules/convertDate.js';
import { FormatDate } from '../../modules/formatDate.js';
import MerchantCard from '../../components/merchantCard/merchantCard.js';
import RatingBar from '../../components/ratingBar/ratingBar.js';

/** Class representing advert page. */
export class Advert {
  #slug;
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
    this.#getSlug();
    this.#renderTemplate();

    return this.#element;
  }

  /**
   * Get slug parameters from URL.
   */
  #getSlug() {
    const url = getURLFromLocation(window.location.href, router.host);
    this.#slug = parsePathParams(router.routes.adPage.href, url);
  }

  /**
   * Add event listeners for page.
   */
  #addListeners() {
    this.#addCarouselListeners();
    this.#addPathListener();
    this.#addCloseListener();
  }

  /**
   * Add listeners for images carousel.
   */
  #addCarouselListeners() {
    const carousel = this.#element.querySelector('.carousel');
    // const imagesContainer = this.#element.querySelector('.images');
    const prevBtn = this.#element.querySelector('.prev-btn');
    const nextBtn = this.#element.querySelector('.next-btn');
    // const images = imagesContainer.querySelectorAll('img');

    let currentIndex = 0;
    const elemsOnPage = 3;
    // let elemsOnPage = 0;
    // let elemWidth = images[0].offsetWidth;
    // const containerWidth = carousel.offsetWidth;
    // while (elemWidth < containerWidth) {
    //   elemsOnPage++;
    //   elemWidth += images[elemsOnPage].offsetWidth;
    // }

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1) % elemsOnPage;
      updateCarousel(currentIndex, elemsOnPage);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % elemsOnPage;
      updateCarousel(currentIndex, elemsOnPage);
    });

    const updateCarousel = (currentIndex, elemsOnPage) => {
      const index = (currentIndex + elemsOnPage) % elemsOnPage;
      const newPosition = index !== 2 ? -index * 80 : -index * 50;

      carousel.style.transform = `translateX(${newPosition}%)`;
    };
  }

  /**
   * Event listener to prevent page reload while clicking links in path.
   */
  #addPathListener() {
    const adPath = this.#element.querySelector('.ad-path');
    const cityPath = adPath.querySelector('.city').childNodes[1];
    const categoryPath = adPath.querySelector('.category').childNodes[1];

    cityPath.addEventListener('click', (ev) => {
      const address = cityPath.href;
      router.pushPage(ev, address);
    });

    categoryPath.addEventListener('click', (ev) => {
      const address = categoryPath.href;
      router.pushPage(ev, address);
    });
  }

  #addCloseListener() {
    const closeBtn = document.querySelector('.close');

    if (closeBtn !== null) {
      closeBtn.addEventListener('click', (ev) => {
        const id = closeBtn.dataset['id'];
        const apiRoute = buildURL(ajax.routes.ADVERT.CLOSE_ADVERT, {'id': id});

        ajax.post(
          apiRoute,
          null,
          (body) => {
            router.go(router.routes.mainPage.href);

            return;
          },
        );
      });
    }
  }

  /**
   * Render the advert page template.
   */
  async #renderTemplate() {
    const content = document.createElement('div');

    this.#element.appendChild(this.header.render());

    content.classList.add('page-content');
    this.#element.appendChild(content);

    const apiRoute = buildURL(ajax.routes.ADVERT.GET_ADVERT, this.#slug);

    let userId = 0;

    await ajax.get(
        apiRoute,
        (body) => {
          const items = body['items'];
          const advert = items['advert'];
          const city = items['city'];
          const category = items['category'];

          const id = advert['id'];
          const adTitle = advert['title'];
          const description = advert['description'];
          const price = advert['price'];
          const created = convertDate(advert['created']);
          const cityName = city['name'];
          const categoryName = category['name'];
          const isAuthor = ajax.auth.id === advert['userId'];

          userId = advert['userId'];

          const categoryPath = buildURLBySegments(router.host,
              [city['translation'], category['translation']]);
          const cityPath = buildURLBySegments(router.host,
              [city['translation']]);
          const editPath = buildURLBySegments(router.host,
              ['edit', advert['id']]);
          const closePath = buildURLBySegments(router.host,
              ['close', advert['id']]);

          const adPathElement = document.createElement('div');
          adPathElement.innerHTML =
            renderAdPathTemplate(cityName, categoryName, adTitle,
                cityPath, categoryPath);
          content.appendChild(adPathElement);

          const adContainer = document.createElement('div');
          adContainer.classList.add('ad-container');
          adContainer.innerHTML = renderAdContainerTemplate(adTitle,
              cityName, categoryName, description, created, price, isAuthor,
              editPath, closePath, id);
          content.appendChild(adContainer);

          this.#addListeners();
        });

        const sellerSection = this.#element.querySelector('.seller-block');

        const id = userId;
        const path = buildURL(ajax.routes.PROFILE.GET_PROFILE, {id});
        await ajax.get(
          path,
          (body) => {
            const profile = body['profile'];
            const merchantsName = profile.merchantsName;
            const ratingValue = profile.rating;

            const merchantCartItems = {
              merchantsName: merchantsName,
              location: profile.city.translation,
              registrationDate: FormatDate(profile.regTime),
              isProfileVerified: profile.approved,
              reviewCount: profile.reactionsCount,
              subscribersCount: profile.subersCount,
              subscribtionsCount: profile.subonsCount,
            };

            const merchantCardInstance = new MerchantCard(merchantCartItems);
            sellerSection.appendChild(merchantCardInstance.render());

            const rating = this.#element.querySelector('.rating');
            const ratingBarInstance = new RatingBar(ratingValue);
            const ratingBar = ratingBarInstance.render();
            rating.appendChild(ratingBar);

            // const rating = this.#element.querySelector('.rating');
            // const ratingBarInstance = new RatingBar(ratingValue);
            // const ratingBar = ratingBarInstance.render();
            // rating.appendChild(ratingBar);

            // const merchantsPageRightSection = this.#element.querySelector('.merchant-page-right-section-switch');
            // const buttonGroupItemes = [
            //   { categoryLabel: 'Активные', count: '20', checked: true, categoryLabelValue: 'active' },
            //   { categoryLabel: 'Проданные', count: '5', checked: false, categoryLabelValue: 'sold' },
            // ];
            // buttonGroupItemes.forEach(item => {
            //   this.sectionState.setSectionState(item.categoryLabelValue, 'isRendered', false);
            // });
            // buttonGroupItemes.forEach(item => {
            //   if (item.checked) {
            //     this.sectionState.setSectionState('serviceField', 'isChecked', item.categoryLabelValue);

            //     return;
            //   }
            });
  }
}
