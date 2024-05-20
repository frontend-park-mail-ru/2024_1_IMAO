'use strict';

import renderMerchantMain from '../../components/merchantMain/merchantMain.js';
import AdsCard from '../../components/adsCard/adsCard.js';
import MerchantCard from '../../components/merchantCard/merchantCard.js';
import EmptyAdvertsPlug from '../../components/emptyAdvertsPlug/emptyAdvertsPlug.js';
import HorizontalButtonGroup from '../../components/horizontalButtonGroup/horizontalButtonGroup.js';
import renderAdPathTemplate from '../../components/adPath/adPath.js';
import RatingBar from '../../components/ratingBar/ratingBar.js';
import formatDate from '../../modules/formatDate.js';
import SkeletonCard from '../../components/skeletonCard/skeletonCard.js';
import StageStorage from '../../modules/stateStorage.js';
import trimString from '../../modules/trimString.js';
import {buildURL, getURLFromLocation, parsePathParams, buildURLBySegments} from '../../modules/parsePathParams.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';

/** Class representing a merchant page. */
export class MerchantsPage {
  #element;
  #isBottomReached;
  #slug;
  #activeAdverts;
  #soldAdverts;

  /**
   * Initialize a main page.
   * @param {*} header
   */
  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
    this.sectionState = new StageStorage();
    this.#isBottomReached = false;
  }

  /**
   * Render the main page.
   * @return {Element} - The element of main page.
   */
  async render() {
    this.#getSlug();
    await this.#renderTemplate();

    this.#addListeners();

    return this.#element;
  }

  /**
   * Get slug parameters from URL.
   */
  #getSlug() {
    const url = getURLFromLocation(window.location.href, router.host);
    this.#slug = parsePathParams(router.routes.merchantsPage.href, url);
  }

  /**
   * Adds state listeners.
   */
  async #addListeners() {
    const inputs = this.#element.querySelectorAll('.active-sold__list input[type="radio"]');

    inputs.forEach(
        function(input) {
          input.addEventListener('click', this.handleClick.bind(this));
        }.bind(this),
    );

    // this.#addScrollListener();
  }

  /**
   * Adds section switching logic.
   * @param {*} event
   */
  handleClick(event) {
    const merchantsCardContainer = this.#element.querySelector('.profile-page__cards-container');
    const isRendered = this.sectionState.getSectionState(event.target.value, 'isRendered');

    const section = event.target.value;

    const currentButtonChecked = this.sectionState.getSectionState('serviceField', 'isChecked');
    this.sectionState.setSectionState('serviceField', 'isChecked', event.target.value);

    this.sectionState.setSectionState(currentButtonChecked, 'render', merchantsCardContainer);

    if (!isRendered) {
      const newMerchantsCardContainer = document.createElement('div');
      newMerchantsCardContainer.classList.add('profile-page__cards-container');
      merchantsCardContainer.replaceWith(newMerchantsCardContainer);
      this.sectionState.setSectionState(event.target.value, 'isRendered', true);
      this.#renderCards(newMerchantsCardContainer, isRendered, section);
    } else {
      const stashedMerchantsCardContainer = this.sectionState.getSectionState(event.target.value, 'render');
      merchantsCardContainer.replaceWith(stashedMerchantsCardContainer);
    }
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
        const merchantsCardContainer = this.#element.querySelector('.profile-page__cards-container');
        const currentState = this.sectionState.getSectionState('active', 'isRendered');
        // this.#renderCards(merchantsCardContainer, currentState);
        if (!currentState) {
          this.sectionState.setSectionState('active', 'isRendered', true);
        }
        this.#isBottomReached = true;
      }
    };

    window.addEventListener('scroll', scrollHandler);
  }

  /**
   * Render advert cards by codition.
   * @param {*} merchantsPageRightSection
   * @param {*} alreadyRendered
   * @param {*} section
   */
  #renderCards(merchantsPageRightSection, alreadyRendered, section) {
    const cards = document.getElementsByClassName('card');
    const startID = cards.length == 0 ? 1 : parseInt(cards[cards.length - 1].dataset['id']) + 1;

    ajax.routes.ADVERT.GET_ADS_LIST.searchParams.delete('deleted');
    ajax.routes.ADVERT.GET_ADS_LIST.searchParams.delete('userId');
    const state = this.sectionState.getSectionState('serviceField', 'isChecked') == 'active' ? 0 : 1;
    const url = getURLFromLocation(window.location.href, router.host);
    const params = parsePathParams(router.routes.merchantsPage.href, url);
    const {id} = params;
    ajax.routes.ADVERT.GET_ADS_LIST.searchParams.append('userId', id);
    ajax.routes.ADVERT.GET_ADS_LIST.searchParams.append('deleted', state);

    const cardsContainerSkeleton = document.createElement('div');

    const skeletonCardsCount = section == 'sold' ? this.#soldAdverts : this.#activeAdverts;

    if (skeletonCardsCount != 0) {
      cardsContainerSkeleton.classList.add('profile-page__cards-container');

      for (let i = 0; i < skeletonCardsCount; i++) {
        const adsCardSkeletonInstance = new SkeletonCard();
        cardsContainerSkeleton.appendChild(adsCardSkeletonInstance.render());
      }

      merchantsPageRightSection.replaceWith(cardsContainerSkeleton);
    }
    // content.appendChild(cardsContainerSkeleton);

    ajax.get(ajax.routes.ADVERT.GET_ADS_LIST, (body) => {
      const adverts = body['items'];
      if (!(adverts && Array.isArray(adverts))) {
        const test = new EmptyAdvertsPlug('aboba');
        merchantsPageRightSection.appendChild(test.render());

        return;
      }

      const cardsContainer = !alreadyRendered ?
        document.createElement('div') :
        document.querySelector('.profile-page__cards-container');
      if (!alreadyRendered) {
        cardsContainer.classList.add('profile-page__cards-container');
      }

      adverts.forEach((inner) => {
        const {price, title, id, inFavourites, city, category, photosIMG, isPromoted, isActive} = inner;

        const path = buildURLBySegments(router.host, [city, category, id]);
        const adsCardInstance = new AdsCard(title, price, id, inFavourites, path, photosIMG, isPromoted, isActive);
        merchantsPageRightSection.appendChild(adsCardInstance.render());
      });

      if (this.#activeAdverts != 0) {
        cardsContainerSkeleton.replaceWith(merchantsPageRightSection);
      }
      this.#isBottomReached = false;
    });
  }

  /**
   * Render a temlate for a merchant page.
   */
  async #renderTemplate() {
    const content = document.createElement('div');

    this.#element.appendChild(this.header.render());

    content.classList.add('page-content');
    this.#element.appendChild(content);

    const urlMain = router.routes.mainPage.href;

    const root = renderMerchantMain();
    content.appendChild(root);

    const path = buildURL(ajax.routes.PROFILE.GET_PROFILE, this.#slug);
    await ajax.get(path, (body) => {
      const profile = body['profile'];

      const id = profile.id;
      const merchantsName = profile.merchantsName;
      const ratingValue = profile.rating;
      if (merchantsName) {
        document.title += ` ${trimString(merchantsName, 40)}`;
      } else {
        document.title += ` Пользователь №${id}`;
      }

      const paths = [
        {
          path: urlMain,
          title: 'Главная',
        },
        {
          path: '#',
          title: merchantsName,
        },
      ];

      const adPathElement = document.createElement('div');
      adPathElement.appendChild(renderAdPathTemplate({paths}));
      content.insertBefore(adPathElement, content.lastChild);

      const merchantCartItems = {
        id: id,
        merchantsName: merchantsName,
        location: profile.city.name,
        registrationDate: formatDate(profile.regTime),
        isProfileVerified: profile.approved,
        reviewCount: profile.reactionsCount,
        subscribersCount: profile.subersCount,
        subscribtionsCount: profile.subonsCount,
        avatarImg: profile.avatarImg,
      };
      const merchantsCardSection = this.#element.querySelector('.profile-page__main');
      const merchantCardInstance = new MerchantCard(merchantCartItems);
      merchantsCardSection.appendChild(merchantCardInstance.render());

      const rating = this.#element.querySelector('.rating');
      const ratingBarInstance = new RatingBar(ratingValue);
      const ratingBar = ratingBarInstance.render();
      rating.appendChild(ratingBar);

      const merchantsPageRightSection = this.#element.querySelector('.profile-page__switch');

      this.#activeAdverts = profile.activeAddsCount;
      this.#soldAdverts = profile.soldAddsCount;

      const buttonGroupItemes = [
        {categoryLabel: 'Активные', count: profile.activeAddsCount, checked: true, categoryLabelValue: 'active'},
        {categoryLabel: 'Проданные', count: profile.soldAddsCount, checked: false, categoryLabelValue: 'sold'},
      ];
      buttonGroupItemes.forEach((item) => {
        this.sectionState.setSectionState(item.categoryLabelValue, 'isRendered', false);
      });
      buttonGroupItemes.forEach((item) => {
        if (item.checked) {
          this.sectionState.setSectionState('serviceField', 'isChecked', item.categoryLabelValue);

          return;
        }
      });
      const horizontalButtonGroupInstance = new HorizontalButtonGroup(buttonGroupItemes);
      merchantsPageRightSection.appendChild(horizontalButtonGroupInstance.render());
    });

    const merchantsCardContainer = this.#element.querySelector('.profile-page__cards-container');
    const currentState = this.sectionState.getSectionState('active', 'isRendered');
    this.#renderCards(merchantsCardContainer, currentState);
    if (!currentState) {
      this.sectionState.setSectionState('active', 'isRendered', true);
    }
  }
}
