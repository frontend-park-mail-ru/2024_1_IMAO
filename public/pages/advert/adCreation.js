'use strict';

/* eslint-disable-next-line max-len */
import renderAdCreationForm from '../../components/adCreationForm/adCreationForm.js';
import {buildURL, parsePathParams, getURLFromLocation} from '../../modules/parsePathParams.js';
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

            this.#addFormListener();
          },
      );
    }

    content.appendChild(form);
  }
}
