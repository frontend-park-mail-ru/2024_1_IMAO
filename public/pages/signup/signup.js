'use strict';

import renderAuthForm from '../../components/authForm/authForm.js';
import {validateEmail, validatePassword} from '../../modules/validate.js';
import {emailError, passwordError} from '../../modules/validate.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';

const passwordMatchError = 'Пароли не совпадают!';
const userAlreadyExistError = 'Такой пользователь уже существует!';

/** Class representing a signup page. */
export class Signup {
  #element;

  /**
   * Initialize a signup page.
   */
  constructor() {
    this.#element = document.createElement('div');
    this.#element.classList.add('auth-page');
  }

  /**
   * Render the signup page.
   * @return {Element} - The element of signup page.
   */
  render() {
    this.#renderTemplate();
    this.#addListeners();

    return this.#element;
  }

  /**
   * Add event listeners for a signup page.
   */
  #addListeners() {
    const anchor = this.#element.getElementsByTagName('a')[0];

    this.#addLoginFollowListener(anchor);

    const form = this.#element.getElementsByClassName('form')[0];

    this.#addFormListener(form);
  }

  /**
   * Add event listeners for a login follow.
   * @param {HTMLElement} anchor - The login follow element.
   */
  #addLoginFollowListener(anchor) {
    anchor.addEventListener('click', (ev) => {
      router.pushPage(ev, anchor.dataset.url);
    });
  }

  /**
   * Add event listeners for a signup form.
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
      const passwordRepeat = inputs[2];
      const data = {email, password, passwordRepeat};

      const divError = this.#element.getElementsByClassName('error')[0];

      if (!this.#validateData(email, password, passwordRepeat, divError)) {
        submit.disabled = false;

        return;
      }

      const apiRoute = ajax.routes.AUTH.SIGNUP;

      ajax.post(
          apiRoute,
          data,
          (body) => {
            if (body?.isAuth === true) {
              router.go(router.routes.mainPage.href);

              return;
            }
            submit.disabled = false;
            divError.innerHTML = userAlreadyExistError;
          },
      );
    });
  }

  /**
   * Validates form data.
   * @param {string} email
   * @param {string} password
   * @param {string} passwordRepeat
   * @param {HTMLElement} divError
   * @return {boolean} - Complete validation or not.
   */
  #validateData(email, password, passwordRepeat, divError) {
    if (!validateEmail(email)) {
      divError.innerHTML = emailError;

      return false;
    }

    if (!validatePassword(password)) {
      divError.innerHTML = passwordError;

      return false;
    }

    if (password != passwordRepeat) {
      divError.innerHTML = passwordMatchError;

      return false;
    }

    return true;
  }

  /**
   * Render a template for a signup page.
   */
  #renderTemplate() {
    const templateParams = {
      title: 'Регистрация в «Волчок»',
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
        {
          name: 'passwordRepeat',
          type: 'password',
          placeholder: 'Повтор пароля',
        },
      ],
      buttonText: 'Зарегистрироваться',
      url: router.routes.loginPage.href,
      askText: 'Есть аккаунт?',
      anchorText: 'Авторизируйтесь',
    };
    this.#element.appendChild(renderAuthForm(templateParams));
  }
}
