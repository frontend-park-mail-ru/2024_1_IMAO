'use strict';

import renderAdCreationForm from '../../components/adCreationForm/adCreationForm.js';
import DropdownWithSearch from '../../components/dropdownWithSearch/dropdownWithSearch.js';
import ImagesUploadPreview from '../../components/imagesUploadPreview/imagesUploadPreview.js';
import {buildURL, parsePathParams, getURLFromLocation} from '../../modules/parsePathParams.js';
import {validateInput, inputError} from '../../modules/validate.js';
import trimString from '../../modules/trimString.js';
import addDynamicPhoneForm from '../../modules/dynamicPhone.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';

/** Class represented advert creation/editing page. */
export class AdCreation {
  #element;
  #create;
  #slug;

  /**
   * Initialize advert creation/editing page.
   * @param {*} header
   * @param {boolean} create - Flag for editing/creation.
   */
  constructor(header, create) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
    this.#create = create;
  }

  /**
   * Render the advert creation/editing page.
   * @return {Element} - The advert creation/editing page.
   */
  async render() {
    await this.#renderTemplate();
    this.#addFormListener();
    const input = this.#element.querySelector('[type="tel"]');
    addDynamicPhoneForm(input);

    return this.#element;
  }

  /**
   * Get slug parameters from URL.
   */
  #getSlug() {
    const url = getURLFromLocation(window.location.href, router.host);
    this.#slug = parsePathParams(router.routes.adEditingPage.href, url);
  }

  /**
   * Add event listeners for the creating/editing advert form.
   */
  #addFormListener() {
    const form = this.#element.getElementsByClassName('form')[0];

    form.addEventListener('submit', (ev) => {
      ev.preventDefault();

      const submit = form.querySelector('[type="submit"]');
      submit.disabled = true;

      let flag = true;

      const phoneInput = this.#element.querySelector('[type="tel"]');
      const phoneInputError = this.#element.querySelector('.form__phone-error');
      phoneInput.classList.remove('input__error');
      phoneInputError.innerHTML = '';
      const phone = phoneInput.value;
      if (!phone.length) {
        phoneInput.classList.add('input__error');
        phoneInputError.innerHTML = 'Введите номер телефона.';
        flag = false;
      } else if (phone.length < 18) {
        phoneInput.classList.add('input__error');
        phoneInputError.innerHTML = 'Введите номер телефона полностью. Формат: +7 (999) 999-99-99';
        flag = false;
      }

      const titleInput = this.#element.querySelector('[id="title"]');
      const titleInputError = this.#element.querySelector('.form__title-error');
      titleInput.classList.remove('input__error');
      titleInputError.innerHTML = '';
      const title = titleInput.value;
      if (!validateInput(title)) {
        titleInput.classList.add('input__error');
        titleInputError.innerHTML = inputError;
        flag = false;
      }

      const descriptionInput = this.#element.querySelector('[id="description"]');
      const descriptionInputError = this.#element.querySelector('.form__description-error');
      descriptionInput.classList.remove('input__error');
      descriptionInputError.innerHTML = '';
      const description = descriptionInput.value;
      if (!validateInput(description)) {
        descriptionInput.classList.add('input__error');
        descriptionInputError.innerHTML = inputError;
        flag = false;
      }

      const imagesUpload = this.#element.querySelectorAll('[type="file"]');
      const fileInputError = this.#element.querySelector('.form__file-error');
      fileInputError.innerHTML = '';
      if (imagesUpload.length <= 1) {
        fileInputError.innerHTML = 'Добавьте хотя бы одно изображение';
        flag = false;
      }

      if (!flag) {
        submit.disabled = false;

        return;
      }

      const city = this.#element.querySelector('.citylist__option--selected').innerHTML;
      const data = new FormData(form);

      data.append('userId', ajax.auth.id);
      data.append('city', city);
      if (!this.#create) {
        data.append('id', this.#slug['id']);
      }

      const apiRoute = this.#create ? ajax.routes.ADVERT.CREATE_ADVERT : ajax.routes.ADVERT.EDIT_ADVERT;

      ajax
          .postMultipart(apiRoute, data, (body) => {
            if (Object.prototype.hasOwnProperty.call(body, 'items')) {
              const items = body['items'];
              const params = {
                city: items['city']['translation'],
                category: items['category']['translation'],
                id: items['advert']['id'],
              };
              router.go(buildURL(router.routes.adPage.href, params));

              return;
            }
            submit.disabled = false;
          })
          .catch(() => {
            submit.disabled = false;
          });
    });
  }

  /**
   * Render a template for the advert creation/editing page.
   */
  async #renderTemplate() {
    const content = document.createElement('div');

    this.#element.appendChild(this.header.render());

    content.classList.add('page-content');
    this.#element.appendChild(content);

    const form = document.createElement('div');
    form.classList.add('ad-creation');

    let CSRFToken = '';
    const apiCSRF = ajax.routes.AUTH.CSRF;

    await ajax.get(apiCSRF, (body) => {
      CSRFToken = body['items'];
    });

    this.photos = [];
    if (this.#create) {
      form.appendChild(renderAdCreationForm(true, CSRFToken));
    } else {
      this.#getSlug();
      const apiRoute = buildURL(ajax.routes.ADVERT.GET_ADVERT_BY_ID, this.#slug);

      let categoryTr = 0;
      let isUsed = 0;
      let CSRFToken = '';

      const apiCSRF = ajax.routes.AUTH.CSRF;

      await ajax.get(apiCSRF, (body) => {
        CSRFToken = body['items'];
      });

      await ajax.get(apiRoute, (body) => {
        const items = body['items'];
        const advert = items['advert'];
        const city = items['city'];
        this.photos = items.photosIMG;
        categoryTr = items.category.translation;
        isUsed = advert.isUsed;

        if (ajax.auth.id !== advert['userId']) {
          router.go(router.routes.mainPage.href);

          return;
        }

        const adTitle = advert['title'];
        const description = advert['description'];
        const price = advert['price'];
        const cityName = city['name'];
        const phone = advert['phone'];

        form.appendChild(renderAdCreationForm(false, CSRFToken, adTitle, price, description, cityName, phone));

        document.title += trimString(adTitle, 40);
      });

      const catSelect = form.querySelector('[id="category"]');
      for (let i = 0; i < catSelect.options.length; i++) {
        if (catSelect.options[i].value == categoryTr) {
          catSelect.options[i].selected = true;
        }
      }
      const stateSelect = form.querySelector('[id="condition"]');
      if (isUsed) {
        stateSelect.options[2].selected = true;
      } else {
        stateSelect.options[1].selected = true;
      }
    }

    content.appendChild(form);
    const pathCity = ajax.routes.CITY.GET_CITY_LIST;
    await ajax.get(pathCity, (body) => {
      const dropdownWithSearchDiv = this.#element.querySelector('.location-place');
      const dropdownWithSearch = new DropdownWithSearch(body, 'Москва');
      const dropdownWithSearchTempl = dropdownWithSearch.render();
      dropdownWithSearchTempl.classList.remove('dropdown-with-search');
      dropdownWithSearchDiv.appendChild(dropdownWithSearchTempl);
    });

    const imagesUpload = new ImagesUploadPreview(this.photos);
    const imagesUploadContainer = this.#element.querySelector('.form__upload');
    imagesUploadContainer.appendChild(imagesUpload.render());
  }
}
