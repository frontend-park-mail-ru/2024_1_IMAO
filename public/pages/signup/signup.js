'use strict';

import {renderAuthForm} from '../../components/authForm/authForm.js';
import {Ajax} from '../../modules/ajax.js';
import {validateEmail, validatePassword} from '../../modules/validate.js';
import {emailError, passwordError} from '../../modules/validate.js';
import {ROUTES, locationResolver} from '../../routes/routes.js';

const ajax = new Ajax();

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
    this.#renderTamplate();
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
      const main = document.getElementsByTagName('main')[0];
      locationResolver(anchor.dataset.url, main);
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

      const data = new URLSearchParams();
      const inputs = [];
      for (const pair of new FormData(form)) {
        data.append(pair[0], pair[1]);
        inputs.push(pair[1]);
      }

      const email = inputs[0].trim();
      const password = inputs[1];
      const passwordRepeat = inputs[2];

      const divError = this.#element.getElementsByClassName('error')[0];

      if (!this.#validateData(email, password, passwordRepeat, divError)) {
        submit.disabled = false;
        return;
      }

      ajax.post(
          ROUTES.signup,
          data,
          (body) => {
            if (body?.isAuth === true) {
              const main = document.getElementsByTagName('main')[0];
              locationResolver(ROUTES.mainPage.href, main);
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
   * Render a tamlate for a signup page.
   */
  #renderTamplate() {
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
      url: ROUTES.loginPage.href,
      askText: 'Есть аккаунт?',
      anchorText: 'Авторизируйтесь',
    };
    const template = renderAuthForm();
    this.#element.innerHTML = template(templateParams);
  }
}
