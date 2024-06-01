'use strict';

import DropdownWithSearch from '../../components/dropdownWithSearch/dropdownWithSearch.js';
import ajax from '../../modules/ajax';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './cityOverlay.hbs';
import styles from './cityOverlay.scss';
import {setCookie, deleteCookie} from '../../modules/cookie';
import router from '../../router/router.js';

/**
 * Class represented an overlays for city form.
 */
class CityOverlay {
  #element;

  /**
   * Constructor for overlay.
   * @param {HTMLElement} button
   * @param {object} data
   * @param {string} currentCity
   * @param {string} CSRFToken
   */
  constructor(button, data, currentCity, CSRFToken) {
    this.button = button;
    this.data = data;
    this.currentCity = currentCity;
    this.CSRFToken = CSRFToken;
  }

  /**
   * Returns an overlay.
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();
    this.#addListeners();

    return this.#element;
  }

  /**
   * Renders an overlay.
   */
  #renderTemplate() {
    this.#element = stringToHtmlElement(template());

    const pathCity = ajax.routes.CITY.GET_CITY_LIST;
    ajax.get(pathCity, (body) => {
      this.cities = body.items.CityItems;
      console.log(this.cities);
      const dropdownWithSearchDiv = this.#element.querySelector('.city-modal__ddws');
      const dropdownWithSearch = new DropdownWithSearch(body, this.currentCity);
      dropdownWithSearchDiv.appendChild(dropdownWithSearch.render());
    });
  }

  /**
   * Add listeners for overlay.
   */
  #addListeners() {
    const myDialog = this.#element;
    const myButton = this.button;

    myButton.addEventListener('click', () => {
      myDialog.showModal();
    });

    myDialog.addEventListener('click', () => {
      myDialog.close();
    });

    const myDiv = this.#element.querySelector('.city-edit-dialog__container');
    myDiv.addEventListener('click', (event) => event.stopPropagation());

    const submit = this.#element.querySelector('.city-modal__content');
    submit.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const city = this.#element.querySelector('.dropdown-with-search__current').innerHTML;
      this.button.innerHTML = city;
      let cityName = '';
      this.cities.forEach((element) => {
        if (element.name == city) {
          cityName = element.translation;
        }
      });
      deleteCookie('location');
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);
      const options = {
        expires: currentDate,
        path: '/',
      };

      setCookie('location', cityName, options);

      router.pushPage(ev, router.routes.mainPage.href.href);
    });
  }
}

export default CityOverlay;
