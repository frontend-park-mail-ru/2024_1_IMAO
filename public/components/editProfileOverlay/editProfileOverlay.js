'use strict';

import DropdownWithSearch from '../../components/dropdownWithSearch/dropdownWithSearch.js';

import ajax from '../../modules/ajax';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './editProfileOverlay.hbs';
import styles from './editProfileOverlay.scss';

/**
 *
 */
class EditProfileOverlay {
  #element;
  /**
   *
   * @param {*} button
   * @param {*} data
   */
  constructor(button, data) {
    this.button = button;
    this.data = data;
  }
  /**
   *
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();
    this.#addListeners();

    return this.#element;
  }

  /**
   *
   */
  #renderTemplate() {
    const context = {
      title: this.data.title,
      fields: this.data.fields,
      id: this.data.id,
    };

    this.#element = stringToHtmlElement(template(context));

    const pathCity = ajax.routes.CITY.GET_CITY_LIST;
    ajax.get(
      pathCity,
      (body) => {
        //const cityList = body.city_list.CityItems;
        //console.log('this.data.fields.value', this.data.fields.value)
        const dropdownWithSearchDiv = this.#element.querySelector('.ddws-div');
        const dropdownWithSearch = new DropdownWithSearch(body, 'Москва');
        dropdownWithSearchDiv.appendChild(dropdownWithSearch.render());

        
      },
    );
  }

  /**
   *
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

    const myDiv = this.#element.querySelector('.profile-container');
    myDiv.addEventListener('click', (event) => event.stopPropagation());
  }
}

export default EditProfileOverlay;
