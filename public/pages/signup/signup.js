'use strict';

import { renderAuthForm } from "../../components/authForm/authForm.js";
import { Ajax } from "../../modules/ajax.js";
import { emailError, passwordError, validateEmail, validatePassword } from "../../modules/validate.js";
import { ROUTES, locationResolver} from "../../routes/routes.js";

const ajax = new Ajax();

const passwordMatchError = 'Пароли не совпадают!';
const userAlreadyExistError = 'Такой пользователь уже существует!';

/** Class representing a signup page. */
export class Signup{
	#parent;

	/**
	 * Initialize a signup page.
	 * @param {HTMLElement} parent - The container for a signup page.
	 */
	constructor(parent) {
		this.#parent = parent;
	}

	/**
	 * Render the signup page.
	 */
	render(){
		this.#renderTamplate();
		this.#addListeners();
	}

	/**
	 * Add event listeners for a signup page.
	 */
	#addListeners(){
		const anchor = this.#parent.getElementsByTagName('a')[0];

		this.#addLoginFollowListener(anchor);

		const form = this.#parent.getElementsByClassName('form')[0];

		this.#addFormListener(form);
	}

	/**
	 * Add event listeners for a login follow.
	 * @param {HTMLElement} anchor - The login follow element.
	 */
	#addLoginFollowListener(anchor){
		anchor.addEventListener('click', (ev) => {
			const main = document.getElementsByTagName('main')[0];
			locationResolver(anchor.dataset.url, main);
		});
	}

	/**
	 * Add event listeners for a signup form.
	 * @param {HTMLElement} form - The form element.
	 */
	#addFormListener(form){
		form.addEventListener('submit', (ev) => {
			ev.preventDefault();

			const data = new URLSearchParams();
			let inputs = [];
			for (const pair of new FormData(form)) {
				data.append(pair[0], pair[1]);
				inputs.push(pair[1]);
			}

			const email = inputs[0].trim();
			const password = inputs[1];
			const password_repeat = inputs[2];

			const divError = this.#parent.getElementsByClassName('error')[0];

			if (!this.#validateData(email, password, password_repeat, divError)){
				return;
			}

			ajax.post(
				ROUTES.signup,
				data,
				(body) => {
					if(body?.isAuth === true) {
						const main = document.getElementsByTagName('main')[0];
						locationResolver(ROUTES.mainPage.href, main);
						return;
					}
					divError.innerHTML = userAlreadyExistError;
				},
			);
		});
	}

	/**
	 * Validates form data.
	 * @param {string} email
	 * @param {string} password
	 * @param {string} password_repeat
	 * @param {HTMLElement} divError
	 * @returns {boolean} - Complete validation or not.
	 */
	#validateData(email, password, password_repeat, divError){
		if (!validateEmail(email)) {
			divError.innerHTML = emailError;
			return false;
		}

		if (!validatePassword(password)) {
			divError.innerHTML = passwordError;
			return false;
		}

		if (password != password_repeat) {
			divError.innerHTML = passwordMatchError;
			return false;
		}

		return true;
	}

	/**
	 * Render a tamlate for a signup page.
	 */
	#renderTamplate(){
		const template = renderAuthForm();
		const title = 'Регистрация в «Волчок»';
		const inputs = [
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
		];
		const buttonText = 'Зарегистрироваться';
		const url = ROUTES.loginPage.href;
		const askText = 'Есть аккаунт?';
		const anchorText = 'Авторизируйтесь';
		this.#parent.innerHTML = template({title, inputs, buttonText, url, askText, anchorText});
	}
}
