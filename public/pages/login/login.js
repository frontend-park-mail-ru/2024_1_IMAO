'use strict';

import {renderAuthForm} from '../../components/authForm/authForm.js';
import {Ajax} from '../../modules/ajax.js';
import {emailError, validateEmail} from '../../modules/validate.js';
import {ROUTES, locationResolver} from '../../routes/routes.js';

const ajax = new Ajax();

const authError = 'Неверный логин или пароль!';

/** Class representing a login page. */
export class Login {
  #element;

  /**
   * Initialize a login page.
   */
  constructor() {
    this.#element = document.createElement('div');
    this.#element.classList.add('auth-page');
  }

  /**
   * Render the login page.
   * @return {Element} - The element of login page.
   */
  render() {
    this.#renderTamplate();
    this.#addListeners();

    return this.#element;
  }

  /**
   * Add event listeners for a login page.
   */
  #addListeners() {
    const anchor = this.#element.getElementsByTagName('a')[0];

    this.#addSignupFollowListener(anchor);

    const form = this.#element.getElementsByClassName('form')[0];

    this.#addFormListener(form);
  }

  /**
   * Add event listeners for a signup follow.
   * @param {HTMLElement} anchor - The signup follow element.
   */
  #addSignupFollowListener(anchor) {
    anchor.addEventListener('click', (ev) => {
      const main = document.getElementsByTagName('main')[0];
      locationResolver(anchor.dataset.url, main);
    });
  }

  /**
   * Add event listeners for a login form.
   * @param {HTMLElement} form - The form element.
   */
  #addFormListener(form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const submit = form.querySelector('[type="submit"]');
      submit.disabled = true;

      const data = new URLSearchParams();
      const inputs = [];
      for (const pair of new FormData(form)) {
        data.append(pair[0], pair[1]);
        inputs.push(pair[1]);
      }

      const email = inputs[0].trim();
      const password = inputs[1];

      const divError = this.#element.getElementsByClassName('error')[0];

      if (!this.#validateData(email, password, divError)) {
        submit.disabled = false;
        return;
      }

      ajax.post(
          ROUTES.login,
          data,
          (body) => {
            if (body?.isAuth === true) {
              const main = document.getElementsByTagName('main')[0];
              locationResolver(ROUTES.mainPage.href, main);
              return;
            }
            submit.disabled = false;
            divError.innerHTML = authError;
          },
      );
    });
  }

  /**
   * Validates form data.
   * @param {string} email
   * @param {string} password
   * @param {HTMLElement} divError
   * @return {boolean} - Complete validation or not.
   */
  #validateData(email, password, divError) {
    if (!validateEmail(email)) {
      divError.innerHTML = emailError;
      return false;
    }

    return true;
  }

  /**
   * Render a tamlate for a login page.
   */
  #renderTamplate() {
    const templateParams = {
      title: 'Вход в «Волчок»',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Электронная почта',
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Пароль',
        },
      ],
      buttonText: 'Войти',
      url: ROUTES.signupPage.href,
      askText: 'Нет аккаунта?',
      anchorText: 'Зарегистрируйтесь',
    };
    const template = renderAuthForm();
    this.#element.innerHTML = template(templateParams);
  }
}
