'use strict';

import {CATEGORIES, serverHost} from '../../config/config.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './header.hbs';
import styles from './header.scss';
import {buildURLBySegments, getURLFromLocation} from '../../modules/parsePathParams.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';
import debounce from '../../modules/debouncer.js';

/** Class representing a header component. */
export class Header {
  #header;

  /**
   * Initialize a header.
   */
  constructor() {
    this.#header = document.createElement('header');
  }

  /**
   * Render the header.
   * @return {Element} - The element of header.
   */
  render() {
    this.#renderHeaderTemplate('Москва');
    this.#addListeners();

    const url = getURLFromLocation(window.location.href, router.host);
    const titleValue = url.searchParams.get('title');
    if (titleValue !== null) {
      this.#header.querySelector('.search__input').value = titleValue;
    }

    return this.#header;
  }

  /**
   * Build API URL from slug parameters in path.
   * @param {string} title - Start ID in database.
   * @return {URL} - Route in API.
   */
  #getRoute(title) {
    const apiRoute = ajax.routes.ADVERT.GET_SUGGESTIONS;

    apiRoute.searchParams.delete('num');
    apiRoute.searchParams.delete('title');

    apiRoute.searchParams.append('num', 8);
    apiRoute.searchParams.append('title', title);

    return apiRoute;
  }

  /**
   *
   * @param {*} func
   * @param {*} wait
   * @return {Function}
   */
  #debounce(func, wait = 300) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }

  /**
   * Add event listeners for a header.
   */
  #addListeners() {
    const anchors = this.#header.getElementsByTagName('a');

    this.#addButtonsListeners(anchors);
    const logoutBtn = this.#header.getElementsByClassName('logout')[0];

    this.#addLogoutListener(logoutBtn);

    const search = this.#header.querySelector('.navbar__search');
    const inputField = this.#header.querySelector('.search__input');
    const searchResults = this.#header.querySelector('.results');

    const debouncedHandleInput = this.#debounce(this.#handleInput, 500);

    inputField.addEventListener('input', debouncedHandleInput);

    inputField.addEventListener('focus', (event) => {
      search.classList.toggle('search-focused');
      this.#handleInput(event);
    });

    inputField.addEventListener('focusout', () => {
      setTimeout(() => search.classList.toggle('search-focused'), 200);
    });

    const searchButton = this.#header.querySelector('.search__button');

    inputField.addEventListener('input', () => {
      if (inputField.value.trim() === '') {
        searchButton.disabled = true;
        searchResults.classList.add('display-none');
      } else {
        searchButton.disabled = false;
        searchResults.classList.remove('display-none');
      }
    });

    searchButton.disabled = true;
    searchResults.classList.add('display-none');

    this.#addSearchListener(searchButton);

    const AdCreationButton = this.#header.querySelector('.btn-success');
    if (this.#isMainPage(AdCreationButton)) {
      this.#addScrollListener(AdCreationButton);
    }
  }

  /**
   *
   * @param {*} button
   */
  #addSearchListener(button) {
    button.addEventListener('click', (ev) => {
      const searchValue = this.#header.querySelector('.search__input').value;
      if (searchValue == '') {
        router.pushPage(ev, router.routes.mainPage.href.href);

        return;
      }

      ev.preventDefault();
      const searchUrl = new URL(router.routes.mainPage.href.href);
      searchUrl.searchParams.set('title', searchValue);
      router.pushPage(ev, searchUrl.href);
    });
  }

  /**
   *
   * @param {*} element
   * @param {*} title
   */
  #addSuggestionListener(element, title) {
    element.addEventListener('click', (ev) => {
      ev.preventDefault();
      const searchUrl = new URL(router.routes.mainPage.href.href);
      searchUrl.searchParams.set('title', title);
      router.pushPage(ev, searchUrl.href);
    });
  }

  /**
   *
   * @param {*} event
   */
  #handleInput(event) {
    const searchValue = this.#header.querySelector('.search__input').value;
    const results = this.#header.querySelector('.results');
    const apiRoute = this.#getRoute(searchValue);

    if (searchValue.trim() === '') {
      while (results.firstChild) {
        results.removeChild(results.firstChild);
      }

      return;
    }

    ajax.get(apiRoute, (body) => {
      while (results.firstChild) {
        results.removeChild(results.firstChild);
      }

      if (!body.items) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.classList.add('nothith-was-found');
        link.href = '#';
        link.textContent = 'По вашему запросу ничего не найдено ;(';
        listItem.appendChild(link);
        results.appendChild(listItem);

        return;
      }

      body.items.forEach((item) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = item;
        listItem.appendChild(link);
        results.appendChild(listItem);
        this.#addSuggestionListener(listItem, item);
      });
    });
  }

  /**
   *  Add event listeners for an interface buttons.
   * @param {HTMLCollectionOf<Element>} buttons - Interface buttons elements.
   */
  #addButtonsListeners(buttons) {
    const categoryButton = this.#header.querySelector('.dropdown__button');
    const caregoryList = this.#header.querySelector('.dropdown-content-left');
    categoryButton.addEventListener('click', (ev) => {
      caregoryList.classList.toggle('display-block');
    });

    const avatarImg = this.#header.querySelector('.profile-icon');
    const optionList = this.#header.querySelector('.dropdown__content--right');
    if (avatarImg) {
      avatarImg.addEventListener('click', (ev) => {
        optionList.classList.toggle('display-block');
      });
    }

    window.addEventListener('mousedown', (ev) => {
      if (!caregoryList.contains(ev.target) && !categoryButton.contains(ev.target)) {
        caregoryList.classList.remove('display-block');
      }

      if (avatarImg) {
        if (!optionList.contains(ev.target) && !avatarImg.contains(ev.target)) {
          optionList.classList.remove('display-block');
        }
      }
    });

    for (const anchor of buttons) {
      if (anchor.dataset.url == undefined) {
        continue;
      }

      anchor.addEventListener('click', (ev) => {
        ev.preventDefault();
        router.pushPage(ev, anchor.dataset.url);
      });
    }
  }

  /**
   * Add event listeners for a logout.
   * @param {HTMLElement} logoutBtn - The logout element.
   */
  #addLogoutListener(logoutBtn) {
    if (!logoutBtn) {
      return;
    }

    logoutBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      ajax.post(ajax.routes.AUTH.LOGOUT, null, (body) => {
        // eslint-disable-next-line camelcase
        ajax.auth.isAuth = body.isAuth;
        this.#renderHeaderTemplate('Москва');
        this.#addListeners();
        const main = document.querySelector('main');
        router.popPage(ev, main);
      });
    });
  }

  /**
   *
   * @param {*} button
   * @return {boolean}
   */
  #isMainPage(button) {
    const routes = router.routes;
    const href = new URL(window.location.href);
    for (const key in routes) {
      if (!Object.prototype.hasOwnProperty.call(routes, key)) {
        continue;
      }
      const route = routes[key];
      if (route.re.test(href.pathname)) {
        if (key == 'mainPage' || key == 'adsListByCity' || key == 'adsListByCategory') {
          button.classList.remove('btn-success--disabled');

          return true;
        }
        button.classList.add('btn-success--disabled');

        return false;
      }
    }
    button.classList.add('btn-success--disabled');

    return false;
  }

  /**
   *@param {*} button
   */
  #addScrollListener(button) {
    let prevScrollpos = window.scrollY;
    window.onscroll = function() {
      const mediaQuery = window.matchMedia('(max-width: 1219px)');
      if (!mediaQuery.matches) {
        return;
      }
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        button.style.bottom = '25px';
      } else {
        button.style.bottom = '-55px';
      }
      prevScrollpos = currentScrollPos;
    };
  }

  /**
   * Renders a template for a header.
   * @private
   * @param {URL} location - The location to be displayed in the header.
   * @return {void}
   */
  #renderHeaderTemplate(location) {
    const urlMain = router.routes.mainPage.href.href;
    const urlLogin = router.routes.loginPage.href.href;
    const urlCreate = router.routes.adCreationPage.href.href;
    const urlCart = router.routes.cartPage.href.href;
    const slugProfileAdverts = ['profile', 'adverts'];
    const urlProfile = buildURLBySegments(serverHost, slugProfileAdverts);
    const slugProfileFavorites = ['profile', 'favorites'];
    const urlProfileFavorites = buildURLBySegments(serverHost, slugProfileFavorites);

    const flag = router.auth.isAuth;
    const avatar = router.auth.avatar;
    const cartQuantity = router.auth.cartNum;
    const favoritesQuantity = router.auth.favNum;
    while (this.#header.firstChild) {
      this.#header.removeChild(this.#header.lastChild);
    }
    const CategoriesWithUrl = CATEGORIES.map((category) => {
      const temp = ['Moscow', String(category.translation)];
      const urlurl = buildURLBySegments(serverHost, temp);
      const url = urlurl.href;
      const {name} = category;
      const {translation} = category;

      return {name, translation, url};
    });
    this.#header.appendChild(
        stringToHtmlElement(
            template({
              urlMain,
              urlLogin,
              urlCreate,
              urlCart,
              urlProfile,
              urlProfileFavorites,
              flag,
              location,
              CategoriesWithUrl,
              avatar,
              cartQuantity,
              favoritesQuantity,
            }),
        ),
    );
  }

  /**
   * Reactively changes cart quantity.
   * @param {*} quantity
   */
  changeCartQuantity(quantity) {
    const quanSpan = this.#header.querySelector('.cart-quantity');
    quanSpan.innerHTML = quantity;
  }

  /**
   * Reactively changes favorites quantity.
   * @param {*} quantity
   */
  changeFavoritesQuantity(quantity) {
    const quanSpan = this.#header.querySelector('.favorites-quantity');
    quanSpan.innerHTML = quantity;
  }
}
