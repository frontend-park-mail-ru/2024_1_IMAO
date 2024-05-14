'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './imagesUploadPreview.hbs';
import styles from './imagesUploadPreview.scss';

/**
 * Class represents an images uploader with preview.
 */
class ImagesUploadPreview {
  #MAX_PHOTOS = 10;
  #curPhotos;
  #element;

  /**
   * Constructor for an images uploader.
   * @param {Array} photos
   */
  constructor(photos) {
    this.photos = photos;
    this.#curPhotos = 0;
  }

  /**
   * Returns an images uploader.
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();

    this.#addEventListener();

    return this.#element;
  }

  /**
   * Renders an images uploader.
   */
  #renderTemplate() {
    this.#element = document.createElement('div');
    this.#element.classList.add('wrapper');
    if (this.photos !== null) {
      this.photos.forEach((photo, index) => {
        const fileForm = stringToHtmlElement(template({index, photo}));
        const fileInput = fileForm.querySelector('[data-image]');
        const dataTransfer = new DataTransfer();
        const bytePhoto = atob(photo);
        const byteNumbers = new Array(bytePhoto.length);
        for (let i = 0; i < bytePhoto.length; i++) {
          byteNumbers[i] = bytePhoto.charCodeAt(i);
        }
        // eslint-disable-next-line no-undef
        const byteArray = new Uint8Array(byteNumbers);
        const file = new File([byteArray], `photo${index}.png`, {type: 'image/png'});
        dataTransfer.items.add(file);
        if (fileInput) {
          fileInput.files = dataTransfer.files;
          this.#element.appendChild(fileForm);
          this.#curPhotos++;
        }
      });
    }
    if (this.#curPhotos < this.#MAX_PHOTOS) {
      this.#element.appendChild(stringToHtmlElement(template()));
      this.#curPhotos++;
    }
  }

  /**
   * Add a listener to delete button.
   * @param {HTMLElement} box
   */
  #deleteListener(box) {
    const deleteIcon = box.querySelector('.dialog-close');

    deleteIcon.addEventListener('click', () => {
      this.#element.removeChild(box);
    });
  }

  /**
   * Initialize an images uploader logic.
   * @param {HTMLElement} box
   */
  #initImageUpload(box) {
    const uploadField = box.querySelector('.upload-box__image-upload');

    /**
     * Gets and Checks file.
     * @param {Event} e
     */
    const getFile = (e) => {
      const file = e.currentTarget.files[0];
      checkType(file);
      const uploadOptions = box.querySelector('.upload-box__upload-options');
      uploadOptions.classList.add('upload-box__upload-options--none');
      const imagePreview = box.querySelector('.upload-box__image-preview');
      imagePreview.classList.remove('upload-box__image-preview--none');
      if (this.#curPhotos < this.#MAX_PHOTOS) {
        const newBox = stringToHtmlElement(template());
        this.#initImageUpload(newBox);
        this.#deleteListener(newBox);
        this.#element.appendChild(newBox);
        this.#curPhotos++;
      }
    };

    /**
     * Vizualize an image preview.
     * @param {File} file
     */
    const previewImage = (file) => {
      const thumb = box.querySelector('.upload-box__image-preview');
      const reader = new FileReader();

      reader.onload = function() {
        thumb.style.backgroundImage = 'url(' + reader.result + ')';
      };
      reader.readAsDataURL(file);
      thumb.className += ' js--no-default';
    };

    /**
     * Resolves a format checking.
     * @param {File} file
     */
    const checkType = (file) => {
      const imageType = /[^\s]+(.*?).(jpg|jpeg|png|JPG|JPEG|PNG)$/;
      if (!file.type.match(imageType)) {
        box.querySelector('.error').innerHTML = 'Недопустимый формат файла. Допустимы форматы: <br/> JPG, PNG.';
        box.classList.add('upload-box--error');
      } else {
        box.querySelector('.error').innerHTML = '';
        previewImage(file);
      }
    };

    uploadField.addEventListener('change', getFile);
  }

  /**
   * Adds listeners for an images uploader.
   */
  #addEventListener() {
    // initialize box-scope
    const boxes = this.#element.querySelectorAll('.upload-box');

    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      this.#initImageUpload(box);
      this.#deleteListener(box);
    }
  }
}

export default ImagesUploadPreview;
