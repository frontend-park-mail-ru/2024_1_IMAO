'use strict';

import renderProfileMain from '../../components/profileMain/profileMain.js';
import AdsCard from '../../components/adsCard/adsCard.js';
import renderOrderBlock from '../../components/orderBlock/orderBlock.js';
import SettingsContainer from '../../components/settingsContainer/settingsContainer';
import ProfileCard from '../../components/profileCard/profileCard.js';
import EmptyAdvertsPlug from '../../components/emptyAdvertsPlug/emptyAdvertsPlug.js';
import EmptyOrderPlug from '../../components/emptyOrderPlug/emptyOrderPlug.js';
import HorizontalButtonGroup from '../../components/horizontalButtonGroup/horizontalButtonGroup.js';
import RatingBar from '../../components/ratingBar/ratingBar.js';
import {formatDate} from '../../modules/formatDate.js';
import StageStorage from '../../modules/stateStorage.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';
import {serverHost} from '../../config/config.js';
import {buildURL, buildURLBySegments, getURLFromLocation, parsePathParams} from '../../modules/parsePathParams.js';

// Показывает за сколько пикселей до конца страницы начинается подгрузка новых объявлений.
const LOADING_GAP = 200;

/** Class representing a main page. */
export class ProfilePage {
  #element;
  #slug;
  #isBottomReached;

  /**
   * Initialize a main page.
   * @param {*} header
   */
  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
    this.sectionState = new StageStorage();
    this.sectionStateV = new StageStorage();
    this.sectionStateS = new StageStorage();
    this.#isBottomReached = false;

    this.labelsAndValues = [
      {categoryLabel: 'Мои объявления', categoryLabelValue: 'adverts'},
      {categoryLabel: 'Мои заказы', categoryLabelValue: 'orders'},
      {categoryLabel: 'Избранное', categoryLabelValue: 'favorites'},
      {categoryLabel: 'Настройки', categoryLabelValue: 'settings'},
    ];
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
   *  Gets Url params.
   */
  #getSlug() {
    const url = getURLFromLocation(window.location.href, router.host);
    this.#slug = parsePathParams(router.routes.profilePage.href, url);
  }

  /**
   * Add listener for section switching.
   */
  #addListeners() {
    const verticalInputs = this.#element.querySelectorAll('.radio-group-vertical input[type="radio"]');

    verticalInputs.forEach((input) => {
      input.addEventListener('click', (event) => {
        this.handleSectionClick(event);
        const temp = ['profile', event.target.value];
        const url = buildURLBySegments(serverHost, temp);
        const path = url.pathname;
        history.pushState({page: path}, path, path);
        const radioButton = this.#element.querySelector(`input[value="${this.#slug.state}"]`);
        radioButton.parentElement.previousElementSibling.classList.remove('icon--action');
      });
    });

    // this.#addScrollListener();
  }

  /**
   * Add section switching logic.
   * @param {*} event
   */
  async handleSectionClick(event) {
    const targetValue = event.target.value;

    const found =
      this.labelsAndValues.find((item) => item.categoryLabelValue === targetValue) || this.labelsAndValues[0];
    this.#element.querySelector('.profile-page__header').innerText = found.categoryLabel;
    const profilePageContentContainer = this.#element.querySelector('.profile-page__content');
    const isRendered = this.sectionStateV.getSectionState(found.categoryLabelValue, 'isRendered');

    const currentButtonChecked = this.sectionStateV.getSectionState('serviceField', 'isChecked');
    this.sectionStateV.setSectionState('serviceField', 'isChecked', found.categoryLabelValue);

    this.sectionStateV.setSectionState(currentButtonChecked, 'render', profilePageContentContainer);

    document.title = 'Профиль - ' + found.categoryLabel;

    const profileCard = this.#element.querySelector('.merchant-card');
    const sectionHeader = this.#element.querySelector('.profile-page__header');
    const profilePage = this.#element.querySelector('.profile-page');
    if (found.categoryLabelValue === 'settings') {
      profileCard.classList.add('disable-card');
      sectionHeader.classList.add('disable-card');
      profilePage.classList.add('disable-padding');
    } else {
      profileCard.classList.remove('disable-card');
      sectionHeader.classList.remove('disable-card');
      profilePage.classList.remove('disable-padding');
    }

    if (isRendered) {
      const stashedMerchantsCardContainer = this.sectionStateV.getSectionState(found.categoryLabelValue, 'render');
      profilePageContentContainer.replaceWith(stashedMerchantsCardContainer);

      return;
    }

    const newProfilePageContentContainer = document.createElement('div');
    newProfilePageContentContainer.classList.add('profile-page__content');
    profilePageContentContainer.replaceWith(newProfilePageContentContainer);
    this.sectionStateV.setSectionState(found.categoryLabelValue, 'isRendered', true);

    let buttonGroupItemes = [];
    let currentState = '';

    switch (found.categoryLabelValue) {
      case 'adverts':
        buttonGroupItemes = [
          {
            categoryLabel: 'Активные',
            count: this.profile.activeAddsCount,
            checked: true,
            categoryLabelValue: 'active',
          },
          {categoryLabel: 'Проданные', count: this.profile.soldAddsCount, checked: false, categoryLabelValue: 'sold'},
        ];

        currentState = this.#addHorizontalSectionState(
            newProfilePageContentContainer,
            buttonGroupItemes,
            this.sectionState,
            this.advertsHandleClick,
        );

        const merchantsCardContainer = document.createElement('div');
        merchantsCardContainer.classList.add('profile-page__cards-container');
        this.#renderCards(merchantsCardContainer, currentState, found.categoryLabelValue);
        newProfilePageContentContainer.appendChild(merchantsCardContainer);
        break;

      case 'orders':
        buttonGroupItemes = [
          {categoryLabel: 'Покупки', count: '', checked: true, categoryLabelValue: 'purchases'},
          {categoryLabel: 'Продажи', count: '', checked: false, categoryLabelValue: 'sales'},
        ];

        currentState = this.#addHorizontalSectionState(
            newProfilePageContentContainer,
            buttonGroupItemes,
            this.sectionStateS,
            this.orderHandleClick,
        );

        const isPerchasesChecked = this.sectionStateS.getSectionState('serviceField', 'isChecked') == 'purchases';

        let adverts = [];
        if (isPerchasesChecked) {
          await ajax.get(ajax.routes.ORDER.GET_ORDERS_LIST, (body) => {
            adverts = body['items'];
          });

          const merchantsCardContainer = document.createElement('div');
          merchantsCardContainer.classList.add('empty-orders');

          if (adverts.length == 0) {
            const header = isPerchasesChecked ? 'Нет покупок' : 'Не продаж';
            const content = isPerchasesChecked ? 'Заказы по купленным товарам' : 'Заказы по проданным товарам';
            const emptyOrderPlug = new EmptyOrderPlug(header, content);
            merchantsCardContainer.appendChild(emptyOrderPlug.render());
          } else if (adverts && Array.isArray(adverts)) {
            adverts.forEach((inner) => {
              const {orderItem, advert} = inner;
              const {status, address, phone, name} = orderItem;
              const ad = advert.advert;
              const photo = advert.photosIMG?.[0];
              const {id, title, price} = ad;
              const orderBlockInstance = renderOrderBlock(id, title, price, status, photo, address, phone, name);
              merchantsCardContainer.appendChild(orderBlockInstance);
            });
          }
          newProfilePageContentContainer.appendChild(merchantsCardContainer);
        }

        break;

      case 'favorites':
        const favoritesCardContainer = document.createElement('div');
        favoritesCardContainer.classList.add('profile-page__cards-container');
        this.#renderCards(favoritesCardContainer, currentState, found.categoryLabelValue);
        newProfilePageContentContainer.appendChild(favoritesCardContainer);
        break;

      case 'settings':
        const settingsContainer = new SettingsContainer(this.profile, this.CSRFToken);
        const settingsContainerElement = await settingsContainer.render();
        newProfilePageContentContainer.appendChild(settingsContainerElement);
        break;
    }
  }

  /**
   * Adds sections states.
   * @param {*} container
   * @param {*} buttonGroupItemes
   * @param {*} sectionState
   * @param {*} handleClick
   * @return {string}
   */
  #addHorizontalSectionState(container, buttonGroupItemes, sectionState, handleClick) {
    buttonGroupItemes.forEach((item) => {
      sectionState.setSectionState(item.categoryLabelValue, 'isRendered', false);
      if (item.checked) {
        sectionState.setSectionState('serviceField', 'isChecked', item.categoryLabelValue);
      }
    });

    const horizontalButtonGroupInstance = new HorizontalButtonGroup(buttonGroupItemes);
    container.appendChild(horizontalButtonGroupInstance.render());

    const currentState = sectionState.getSectionState(buttonGroupItemes.categoryLabelValue, 'isRendered');
    if (!currentState) {
      this.sectionState.setSectionState(buttonGroupItemes.categoryLabelValue, 'isRendered', true);
    }

    const inputs = this.#element.querySelectorAll('.active-sold__list input[type="radio"]');

    inputs.forEach(
        function(input) {
          input.addEventListener('click', handleClick.bind(this));
        }.bind(this),
    );

    return currentState;
  }

  /**
   * Adds adverts states.
   * @param {*} event
   */
  advertsHandleClick(event) {
    const merchantsCardContainer = this.#element.querySelector('.profile-page__cards-container');
    const isRendered = this.sectionState.getSectionState(event.target.value, 'isRendered');

    const currentButtonChecked = this.sectionState.getSectionState('serviceField', 'isChecked');
    this.sectionState.setSectionState('serviceField', 'isChecked', event.target.value);

    this.sectionState.setSectionState(currentButtonChecked, 'render', merchantsCardContainer);

    if (!isRendered) {
      const newMerchantsCardContainer = document.createElement('div');
      newMerchantsCardContainer.classList.add('profile-page__cards-container');
      merchantsCardContainer.replaceWith(newMerchantsCardContainer);
      this.sectionState.setSectionState(event.target.value, 'isRendered', true);
      this.#renderCards(newMerchantsCardContainer, isRendered, 'adverts');
    } else {
      const stashedMerchantsCardContainer = this.sectionState.getSectionState(event.target.value, 'render');
      merchantsCardContainer.replaceWith(stashedMerchantsCardContainer);
    }
  }

  /**
   * Adds orders states.
   * @param {*} event
   */
  async orderHandleClick(event) {
    const merchantsCardContainer = this.#element.querySelector('.empty-orders');
    const isRendered = this.sectionStateS.getSectionState(event.target.value, 'isRendered');

    const currentButtonChecked = this.sectionStateS.getSectionState('serviceField', 'isChecked');
    this.sectionStateS.setSectionState('serviceField', 'isChecked', event.target.value);

    this.sectionStateS.setSectionState(currentButtonChecked, 'render', merchantsCardContainer);

    if (!isRendered) {
      this.sectionStateS.setSectionState(event.target.value, 'isRendered', true);
      const isPerchasesChecked = this.sectionStateS.getSectionState('serviceField', 'isChecked') == 'purchases';
      const header = isPerchasesChecked ? 'Нет покупок' : 'Не продаж';
      const content = isPerchasesChecked ? 'Заказы по купленным товарам' : 'Заказы по проданным товарам';
      if (isPerchasesChecked) {
        let adverts = {};
        await ajax.get(ajax.routes.ORDER.GET_ORDERS_LIST, (body) => {
          adverts = body['items'];
        });

        if (adverts.length == 0) {
          const emptyOrderPlug = new EmptyOrderPlug(header, content);
          merchantsCardContainer.replaceWith(emptyOrderPlug.render());
        }
        if (adverts && Array.isArray(adverts)) {
          const newMerchantsCardContainer = document.createElement('div');
          newMerchantsCardContainer.classList.add('empty-orders');
          adverts.forEach((inner) => {
            const {orderItem, advert} = inner;
            const {status, address, phone, name} = orderItem;
            const ad = advert.advert;
            const photo = advert.photosIMG?.[0];
            const {id, title, price} = ad;
            const orderBlockInstance = renderOrderBlock(id, title, price, status, photo, address, phone, name);
            newMerchantsCardContainer.appendChild(orderBlockInstance);
          });
          merchantsCardContainer.replaceWith(newMerchantsCardContainer);
        }

        return;
      }

      const emptyOrderPlug = new EmptyOrderPlug(header, content);
      merchantsCardContainer.replaceWith(emptyOrderPlug.render());
    } else {
      const stashedMerchantsCardContainer = this.sectionStateS.getSectionState(event.target.value, 'render');
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

      if (position + winHeight >= docHeight - LOADING_GAP && !this.#isBottomReached) {
        const merchantsCardContainer = this.#element.querySelector('.profile-page__cards-container');
        const currentState = this.sectionState.getSectionState('active', 'isRendered');
        this.#renderCards(merchantsCardContainer, currentState);
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
   * @param {HTMLElement} merchantsPageRightSection
   * @param {*} alreadyRendered
   * @param {*} sectionState
   */
  async #renderCards(merchantsPageRightSection, alreadyRendered, sectionState) {
    const cards = document.getElementsByClassName('card');
    const startID = cards.length == 0 ? 1 : parseInt(cards[cards.length - 1].dataset['id']) + 1;

    ajax.routes.ADVERT.GET_ADS_LIST.searchParams.delete('deleted');
    ajax.routes.ADVERT.GET_ADS_LIST.searchParams.delete('userId');
    const state = this.sectionState.getSectionState('serviceField', 'isChecked') == 'active' ? 0 : 1;
    const id = ajax.auth.id;
    ajax.routes.ADVERT.GET_ADS_LIST.searchParams.append('userId', id);
    ajax.routes.ADVERT.GET_ADS_LIST.searchParams.append('deleted', state);

    let apiRoute = null;
    switch (sectionState) {
      case 'adverts':
        apiRoute = ajax.routes.ADVERT.GET_ADS_LIST;
        break;

      case 'favorites':
        apiRoute = ajax.routes.FAVORITES.GET_FAVORITES_LIST;
        break;
    }

    let adverts = {};
    await ajax.get(apiRoute, (body) => {
      adverts = body['items'];
    });

    if (!(adverts && Array.isArray(adverts))) {
      const content =
        this.sectionState.getSectionState('serviceField', 'isChecked') == 'active' ? 'активные' : 'проданные';
      const emptyAdvertsPlug = new EmptyAdvertsPlug({content});
      merchantsPageRightSection.appendChild(emptyAdvertsPlug.render());

      return;
    }

    if (adverts.length == 0) {
      const content = {
        header: 'В избранном пусто',
        content: 'избранные',
      };
      const emptyAdvertsPlug = new EmptyAdvertsPlug(content);
      merchantsPageRightSection.appendChild(emptyAdvertsPlug.render());
    }

    const cardsContainer = !alreadyRendered ?
      document.createElement('div') :
      document.querySelector('.profile-page__cards-container');
    if (!alreadyRendered) {
      cardsContainer.classList.add('profile-page__cards-container');
    }

    const ids = [];
    adverts.forEach((inner) => {
      const {price, title, id, inFavourites, city, category, photosIMG, isPromoted, isActive} = inner;
      ids.push(id);
      const path = buildURLBySegments(router.host, [city, category, id]);
      const adsCardInstance = new AdsCard(title, price, id, inFavourites, path, photosIMG, isPromoted, isActive);
      merchantsPageRightSection.appendChild(adsCardInstance.render());
    });

    this.#isBottomReached = false;

    ids.forEach((id) => {
      const address = this.#element.querySelector(`.card-address[id="${id}"]`);
      address.addEventListener('click', (ev) => {
        if (ev.target.matches('path') || ev.target.matches('svg') || ev.target.matches('.like-icon')) {
          return;
        }
        router.pushPage(ev, address.href);
      });
    });
  }

  /**
   * Render a temlate for a profile page.
   */
  async #renderTemplate() {
    this.#element.appendChild(this.header.render());
    const root = renderProfileMain();
    this.#element.appendChild(root);
    const id = ajax.auth.id;
    const path = buildURL(ajax.routes.PROFILE.GET_PROFILE, {id: id});
    const apiCSRF = ajax.routes.AUTH.CSRF;

    await ajax.get(apiCSRF, (body) => {
      this.CSRFToken = body['items'];
    });

    let profile = {};
    await ajax.get(path, (body) => {
      profile = body['items'];
    });

    const merchantsName = profile.merchantsName;
    const ratingValue = profile.rating;

    this.profile = {
      id: profile.id,
      merchantsName: profile.merchantsName,
      ratingValue: profile.rating,
      name: profile.name,
      surname: profile.surname,
      phone: profile.phoneNumber,
      email: ajax.auth.email,
      city: profile.city.name,
      location: profile.city.name,
      registrationDate: formatDate(profile.regTime),
      isProfileVerified: profile.approved,
      reviewCount: profile.reactionsCount,
      subscribersCount: profile.subersCount,
      subscribtionsCount: profile.subonsCount,
      avatarImg: profile.avatarImg,
      activeAddsCount: profile.activeAddsCount,
      soldAddsCount: profile.soldAddsCount,
    };

    const merchantsCardSection = this.#element.querySelector('.profile-page__main');
    const profileCardInstance = new ProfileCard(this.profile);
    merchantsCardSection.appendChild(profileCardInstance.render());

    const rating = this.#element.querySelector('.rating');
    const ratingBarInstance = new RatingBar(ratingValue);
    const ratingBar = ratingBarInstance.render();
    rating.appendChild(ratingBar);

    const event = {
      target: {
        value: this.#slug.state,
      },
    };

    const radioButton = this.#element.querySelector(`[value="${this.#slug.state}"]`);
    radioButton.checked = true;
    radioButton.parentElement.previousElementSibling.classList.add('icon--action');

    this.handleSectionClick(event);
  }
}
