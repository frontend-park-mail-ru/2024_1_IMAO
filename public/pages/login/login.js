'use strict';

import renderAuthForm from '../../components/authForm/authForm.js';
import {emailError, validateEmail} from '../../modules/validate.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';

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
    this.#renderTemplate();
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
      router.pushPage(ev, anchor.dataset.url);
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

      const inputs = [];
      for (const pair of new FormData(form)) {
        inputs.push(pair[1]);
      }

      const email = inputs[0].trim();
      const password = inputs[1];
      const data = {email, password};

      const divError = this.#element.querySelector('.error');

      if (!this.#validateData(email, password, divError)) {
        submit.disabled = false;

        return;
      }

      const apiRoute = ajax.routes.AUTH.LOGIN;

      ajax.post(
          apiRoute,
          data,
          (body) => {
            if (body?.isAuth === true) {
              const main = document.querySelector('main');
              router.popPage(ev, main);

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
   * Render a template for a login page.
   */
  #renderTemplate() {
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
      url: router.routes.signupPage.href,
      askText: 'Нет аккаунта?',
      anchorText: 'Зарегистрируйтесь',
    };
    this.#element.appendChild(renderAuthForm(templateParams));
  }
}
