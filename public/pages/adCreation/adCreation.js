'use strict';

/* eslint-disable-next-line max-len */
import {renderAdCreationForm} from '../../components/adCreationForm/adCreationForm.js';
import ajax from '../../modules/ajax.js';
import {buildURL} from '../../modules/parsePathParams.js';
import router from '../../router/router.js';

/** Class represented advert creation page. */
export class AdCreation {
  #element;

  /**
   * Initialize advert creation page.
   * @param {*} header
   */
  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
  }

  /**
   * Render the advert creation page.
   * @return {Element} - The advert creation page.
   */
  render() {
    this.#renderTemplate();
    this.#addFormListener();

    return this.#element;
  }

  /**
   * Add event listeners for the creating advert form.
   */
  #addFormListener() {
    const form = this.#element.getElementsByClassName('form')[0];

    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const submit = form.querySelector('[type="submit"]');
      submit.disabled = true;

      const data = new FormData(form);
      const apiRoute = ajax.routes.ADVERT.CREATE_ADVERT;

      ajax.postMultipart(
          apiRoute,
          data,
          (body) => {
            if (body.hasOwnProperty('items')) {
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
   * Render a template for the advert creation page.
   */
  #renderTemplate() {
    const content = document.createElement('div');

    this.#element.appendChild(this.header.render());

    content.classList.add('page-content');
    this.#element.appendChild(content);

    const form = document.createElement('div');
    form.classList.add('ad__creation');
    form.innerHTML = renderAdCreationForm();
    content.appendChild(form);
  }
}
