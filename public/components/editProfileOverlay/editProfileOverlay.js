'use strict';

import DropdownWithSearch from '../../components/dropdownWithSearch/dropdownWithSearch.js';

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
        const dropdownWithSearch = new DropdownWithSearch(body, this.currentCity);
        dropdownWithSearchDiv.appendChild(dropdownWithSearch.render());
      });
    }

    if (context.fields[0].isPhone) {
      this.#addDynamicPhoneForm();
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
          document.getElementById('imagePreview').style.backgroundImage = 'url(' + e.target.result + ')';
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

  /**
   * Add listener for the phone field.
   */
  #addDynamicPhoneForm() {
    const input = this.#element.querySelector('#phone');
    let keyCode;

    /**
     * Matches input on mask.
     * @param {Event} event
     */
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      // eslint-disable-next-line no-invalid-this
      const pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      const matrix = '+7 (___) ___-__-__';
      let i = 0;
      const def = matrix.replace(/\D/g, '');
      // eslint-disable-next-line no-invalid-this
      const val = this.value.replace(/\D/g, '');
      let newValue = matrix.replace(/[_\d]/g, function(a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
      i = newValue.indexOf('_');
      if (i != -1) {
        i < 5 && (i = 3);
        newValue = newValue.slice(0, i);
      }

      let reg = matrix
      // eslint-disable-next-line no-invalid-this
          .substr(0, this.value.length)
          .replace(/_+/g, function(a) {
            return '\\d{1,' + a.length + '}';
          })
          .replace(/[+()]/g, '\\$&');
      reg = new RegExp('^' + reg + '$');
      if (
        // eslint-disable-next-line no-invalid-this
        !reg.test(this.value) ||
        // eslint-disable-next-line no-invalid-this
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      ) {
        // eslint-disable-next-line no-invalid-this
        this.value = newValue;
      }
      // eslint-disable-next-line no-invalid-this
      if (event.type == 'blur' && this.value.length < 5) this.value = '';
    }

    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);
    input.addEventListener('keydown', mask, false);
    input.addEventListener('mouseup', (event) => {
      event.preventDefault();
      if (input.value.length < 4) {
        input.setSelectionRange(4, 4);
      } else {
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  }
}

export default EditProfileOverlay;
