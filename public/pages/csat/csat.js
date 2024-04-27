'use strict';

import CsatComp from '../../components/csatComp/csatComp.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';


/** Class representing a login page. */
export class Csat {
  #element;

  /**
   * Initialize a login page.
   */
  constructor() {
    this.#element = document.createElement('div');
  }

  /**
   * Render the login page.
   * @return {Element} - The element of login page.
   */
  render() {
    this.#renderTemplate();

    return this.#element;
  }

  /**
   * Render a template for a login page.
   */
  #renderTemplate() {
    const templateParams = {
      CsatTitle: 'Опрос',
      questions: [
        {
          num: 1,
          title: 'email',
          postTitle: 'Электронная почта',
          options: [
            {
              value: 1,
              option: 'option1',
            },
            {
              value: 2,
              option: 'option2',
            },
          ],
        },
        {
          num: 2,
          title: 'email2',
          postTitle: 'Электронная почта2',
          options: [
            {
              value: 1,
              option: 'option1',
            },
            {
              value: 2,
              option: 'option2',
            },
          ],
        },
        {
          num: 3,
          title: 'email3',
          postTitle: 'Электронная почта3',
          options: [
            {
              value: 1,
              option: 'option1',
            },
            {
              value: 2,
              option: 'option2',
            },
          ],
        },
      ],
    };

    const csatComp = new CsatComp(templateParams).render();
    this.#element.appendChild(csatComp);
  }
}
