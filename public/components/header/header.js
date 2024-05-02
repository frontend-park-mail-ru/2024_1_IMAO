'use strict';

import {CATEGORIES, serverHost} from '../../config/config.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './header.hbs';
import styles from './header.scss';
import {buildURLBySegments} from '../../modules/parsePathParams.js';
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

    return this.#header;
  }

  /**
   * Build API URL from slug parameters in path.
   * @param {int} startID - Start ID in database.
   * @return {URL} - Route in API.
   */
  #getRoute(title) {
    let apiRoute = ajax.routes.ADVERT.GET_SUGGESTIONS;
    
    apiRoute.searchParams.delete('num');
    apiRoute.searchParams.delete('title');

    apiRoute.searchParams.append('num', 8);
    apiRoute.searchParams.append('title', title);

    return apiRoute;
  }

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

    // const cartButton = this.#header.querySelector('.cart-action');

    const search = this.#header.querySelector('.search');
    const inputField = this.#header.querySelector('.search-input');

    const debouncedHandleInput = this.#debounce(this.#handleInput, 500);
    
    inputField.addEventListener('input', debouncedHandleInput);

    inputField.addEventListener('focus', function() {
      console.log('Поле ввода получило фокус');
      search.classList.toggle('search-focused');
    });

    inputField.addEventListener('blur', function() {
      console.log('Поле ввода потеряло фокус');
      search.classList.toggle('search-focused');
    });

    
  }

  #handleInput(event) {
    console.log('Обработка ввода:', event.target.value);

    const searchValue = this.#header.querySelector('.search-input').value;
    const results = this.#header.querySelector('.results');
    console.log('searchValue',searchValue)
    const apiRoute = this.#getRoute(searchValue) 

    ajax.get(
      apiRoute,
      (body) => {
        
        while (results.firstChild) {
          results.removeChild(results.firstChild);
        }

        if (!body.items){
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          link.href = '#';
          link.textContent = 'По вашему запросу ничего не найдено ;(';
          listItem.appendChild(link);
          results.appendChild(listItem);

          return
        }

        body.items.forEach(function(item) {
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          link.href = '#';
          link.textContent = item;
          listItem.appendChild(link);
          results.appendChild(listItem);
        });
      },
    );


  }

  /**
   *  Add event listeners for an interface buttons.
   * @param {HTMLCollectionOf<Element>} buttons - Interface buttons elements.
   */
  #addButtonsListeners(buttons) {
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
      ajax.post(
          ajax.routes.AUTH.LOGOUT,
          null,
          (body) => {
            // eslint-disable-next-line camelcase
            ajax.auth.isAuth = body.isAuth;
            this.#renderHeaderTemplate('Москва');
            this.#addListeners();
            const main = document.querySelector('main');
            router.popPage(ev, main);
          },
      );
    });
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

      return {name, url};
    });
    this.#header.appendChild(stringToHtmlElement(template({
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
    })));
  }

  /**
   *
   * @param {*} quantity
   */
  changeCartQuantity(quantity) {
    const quanSpan = this.#header.querySelector('.cart-quantity');
    quanSpan.innerHTML = quantity;
  }

  /**
   *
   * @param {*} quantity
   */
  changeFavoritesQuantity(quantity) {
    const quanSpan = this.#header.querySelector('.favorites-quantity');
    quanSpan.innerHTML = quantity;
  }
}
