'use strict';

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
      hasAvatar: this.data.hasAvatar,
      avatar: this.data.avatar,
    };

    this.#element = stringToHtmlElement(template(context));
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

    this.#addAvatarListener();
  }

  /**
   * Add listener for the avatar uploading
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
          document.getElementById('imagePreview').style.backgroundImage =
            'url(' + e.target.result + ')';
        };

        reader.readAsDataURL(input.files[0]);
      }
    }

    const fileField = document.getElementById('imageUpload');
    if (fileField) {
      fileField.addEventListener('change', function() {
        readURL(fileField);
      });
    }
  }
}

export default EditProfileOverlay;
