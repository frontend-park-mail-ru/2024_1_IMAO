'use strict';

/* eslint-disable-next-line max-len */
import renderAdCreationForm from '../../components/adCreationForm/adCreationForm.js';
import DropdownWithSearch from '../../components/dropdownWithSearch/dropdownWithSearch.js';
import {buildURL, parsePathParams, getURLFromLocation} from '../../modules/parsePathParams.js';
import trimString from '../../modules/trimString.js';
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
  render() {
    this.#renderTemplate();
    this.#addDynamicPhoneForm();
    if (this.#create) {
      this.#addFormListener();
    }

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

      const data = new FormData(form);
      data.append('userId', ajax.auth.id);
      if (!this.#create) {
        data.append('id', this.#slug['id']);
      }

      const apiRoute = this.#create ?
        ajax.routes.ADVERT.CREATE_ADVERT :
        ajax.routes.ADVERT.EDIT_ADVERT;

      ajax.postMultipart(
          apiRoute,
          data,
          (body) => {
            if (Object.prototype.hasOwnProperty.call(body, 'items')) {
              const items = body['items'];
              const params = {
                'city': items['city']['translation'],
                'category': items['category']['translation'],
                'id': items['advert']['id'],
              };
              router.go(buildURL(router.routes.adPage.href, params));

              return;
            }
            submit.disabled = false;
          },
      );
    });
  }

  /**
   *
   */
  #addDynamicPhoneForm() {
    const input = this.#element.querySelector('[type="tel"]');
    let keyCode;

    /**
     *
     * @param {Event} event
     */
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      const pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      const matrix = '+7 (___) ___-__-__';
      let i = 0;
      const def = matrix.replace(/\D/g, '');
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
          .substr(0, this.value.length)
          .replace(/_+/g, function(a) {
            return '\\d{1,' + a.length + '}';
          })
          .replace(/[+()]/g, '\\$&');
      reg = new RegExp('^' + reg + '$');
      if (
        !reg.test(this.value) ||
          this.value.length < 5 ||
          (keyCode > 47 && keyCode < 58)
      ) {
        this.value = newValue;
      }
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

  /**
   * Render a template for the advert creation/editing page.
   */
  #renderTemplate() {
    const content = document.createElement('div');

    this.#element.appendChild(this.header.render());

    content.classList.add('page-content');
    this.#element.appendChild(content);

    const form = document.createElement('div');
    form.classList.add('ad__creation');

    if (this.#create) {
      form.appendChild(renderAdCreationForm(true));
    } else {
      this.#getSlug();
      const apiRoute = buildURL(ajax.routes.ADVERT.GET_ADVERT_BY_ID,
          this.#slug);

      ajax.get(
          apiRoute,
          (body) => {
            const items = body['items'];
            const advert = items['advert'];
            const city = items['city'];

            if (ajax.auth.id !== advert['userId']) {
              router.go(router.routes.mainPage.href);

              return;
            }

            const adTitle = advert['title'];
            const description = advert['description'];
            const price = advert['price'];
            const cityName = city['name'];

            form.appendChild(renderAdCreationForm(false, adTitle, price,
                description, cityName));

            document.title += trimString(adTitle, 40);
            this.#addFormListener();
          },
      );
    }

    content.appendChild(form);
    const pathCity = ajax.routes.CITY.GET_CITY_LIST;
    ajax.get(
        pathCity,
        (body) => {
          const dropdownWithSearchDiv = this.#element.querySelector('.location-place');
          const dropdownWithSearch = new DropdownWithSearch(body, 'Москва');
          const dropdownWithSearchTempl = dropdownWithSearch.render();
          dropdownWithSearchTempl.classList.remove('dropdown-with-search');
          console.log(dropdownWithSearchTempl.classList);
          // dropdownWithSearchTempl.setProperty('height', '');
          dropdownWithSearchDiv.appendChild(dropdownWithSearchTempl);
        },
    );
  }
}
