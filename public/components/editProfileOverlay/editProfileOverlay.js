'use strict';

import DropdownWithSearch from '../../components/dropdownWithSearch/dropdownWithSearch.js';
import addDynamicPhoneForm from '../../modules/dynamicPhone.js';
import ajax from '../../modules/ajax';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './editProfileOverlay.hbs';
import styles from './editProfileOverlay.scss';

/**
 * Class represented an overlays for profile form.
 */
class EditProfileOverlay {
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
    const context = {
      title: this.data.title,
      fields: this.data.fields,
      id: this.data.id,
      hasAvatar: this.data.hasAvatar,
      avatar: this.data.avatar,
      CSRFToken: this.CSRFToken,
    };

    this.#element = stringToHtmlElement(template(context));

    if (context.fields[0].isCitySearch) {
      const pathCity = ajax.routes.CITY.GET_CITY_LIST;
      ajax.get(pathCity, (body) => {
        const dropdownWithSearchDiv = this.#element.querySelector('.profile-modal__ddws');
        const dropdownWithSearch = new DropdownWithSearch(body.items.CityItems, this.currentCity);
        dropdownWithSearchDiv.appendChild(dropdownWithSearch.render());
      });
    }

    if (context.fields[0].isPhone) {
      const input = this.#element.querySelector('#phone');
      addDynamicPhoneForm(input);
    }
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

    const myDiv = this.#element.querySelector('.profile-edit-dialog__container');
    myDiv.addEventListener('click', (event) => event.stopPropagation());

    if (this.data.hasAvatar) {
      this.#addAvatarListener();
    }
  }

  /**
   * Add listener for the avatar uploading.
   */
  #addAvatarListener() {
    /**
     * Reads URL from uploaded image.
     * @param {HTMLElement} input - File input.
     */
    function readURL(input) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById('imagePreview').style.backgroundImage = `url(${e.target.result})`;
        };

        reader.readAsDataURL(input.files[0]);
      }
    }

    const fileField = this.#element.querySelector('#imageUpload');
    if (fileField) {
      fileField.addEventListener('change', function() {
        readURL(fileField);
      });
    }
  }
}

export default EditProfileOverlay;
