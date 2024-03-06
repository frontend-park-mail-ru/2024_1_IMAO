'use strict';

import { renderAuthForm } from "../../components/authForm/authForm.js";
import { Ajax } from "../../modules/ajax.js";
import { emailError, passwordError, validateEmail, validatePassword } from "../../modules/validate.js";
import { ROUTES, locationResolver } from "../../routes/routes.js";

const ajax = new Ajax();

const authError = 'Неверный логин или пароль!';

/** Class representing a login page. */
export class Login{
	#parent;

	/**
	 * Initialize a login page.
	 * @param {HTMLElement} parent - The container for a login page.
	 */
	constructor(parent) {
		this.#parent = parent;
	}

	/**
	 * Render the login page.
	 */
	render(){
		this.#renderTamplate();
		this.#addListeners();
	}

	/**
	 * Add event listeners for a login page.
	 */
	#addListeners(){
		const anchor = this.#parent.getElementsByTagName('a')[0];

		this.#addSignupFollowListener(anchor);

		const form = this.#parent.getElementsByClassName('form')[0];

		this.#addFormListener(form);
	}

	/**
	 * Add event listeners for a signup follow.
	 * @param {HTMLElement} anchor - The signup follow element.
	 */
	#addSignupFollowListener(anchor){
		anchor.addEventListener('click', (ev) => {
			const main = document.getElementsByTagName('main')[0];
			locationResolver(anchor.dataset.url, main);
		});
	}

	/**
	 * Add event listeners for a login form.
	 * @param {HTMLElement} form - The form element.
	 */
	#addFormListener(form){
		form.addEventListener('submit', (ev) => {
			ev.preventDefault();

			const data = new URLSearchParams();
			const inputs = []
			for (const pair of new FormData(form)) {
				data.append(pair[0], pair[1]);
				inputs.push(pair[1]);
			}

			const email = inputs[0].trim();
			const password = inputs[1];

			const divError = this.#parent.getElementsByClassName('error')[0];

			if (!this.#validateData(email, password, divError)) {
				return;
			}

			ajax.post(
				ROUTES.login,
				data,
				(body) => {
					if(body?.isAuth === true) {
						const main = document.getElementsByTagName('main')[0];
						locationResolver(ROUTES.mainPage.href, main);
						return;
					}
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
	 * @returns {boolean} - Complete validation or not.
	 */
	#validateData(email, password, divError){
		if (!validateEmail(email)) {
			divError.innerHTML = emailError;
			return false;
		}
		
		return true;
	}

	/**
	 * Render a tamlate for a login page.
	 */
	#renderTamplate(){
		const template = renderAuthForm();
		const title = 'Вход в «Волчок»';
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
		];
		const buttonText = 'Войти';
		const url = ROUTES.signupPage.href;
		const askText = 'Нет аккаунта?';
		const anchorText = 'Зарегистрируйтесь';
		this.#parent.innerHTML = template({title, inputs, buttonText, url, askText, anchorText});
	}
}
