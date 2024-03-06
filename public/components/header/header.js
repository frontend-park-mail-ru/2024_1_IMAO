'use strict';

import { Ajax } from "../../modules/ajax.js";
import { ROUTES, locationResolver, auth } from "../../routes/routes.js";

const ajax = new Ajax();

/** Class representing a header component. */
export class Header{
	#parent;

	/**
	 * Initialize a header.
	 * @param {HTMLElement} parent - The container for a header.
	 */
	constructor(parent) {
		this.#parent = parent;
	}

	/**
	 * Render the header.
	 */
	render(){
		this.#renderTamplate();
		this.#addListeners();
	}

	/**
	 * Add event listeners for a header.
	 */
	#addListeners(){
		const anchors = this.#parent.getElementsByTagName('a');

		this.#addButtonsListeners(anchors);

		const logoutBtn = this.#parent.getElementsByClassName('logout')[0];

		this.#addLogoutListener(logoutBtn);
	}

	/**
	 *  Add event listeners for an interface buttons.
	 * @param {HTMLCollectionOf<Element>} buttons - Interface buttons elements.
	 */
	#addButtonsListeners(buttons){
		for (const anchor of buttons) {
			if (anchor.dataset.url == undefined) {
				continue;
			}

			anchor.addEventListener('click', (ev) => {
				const main = document.getElementsByTagName('main')[0];
				locationResolver(anchor.dataset.url, main);
			})
		}
	}

	/**
	 * Add event listeners for a logout.
	 * @param {HTMLElement} logoutBtn - The logout element.
	 */
	#addLogoutListener(logoutBtn){
		if (!logoutBtn){
			return;
		}

		logoutBtn.addEventListener('click', (ev) => {
			ajax.post(
				ROUTES.logout,
				null,
				(body) => {
					const main = document.getElementsByTagName('main')[0];
					locationResolver(ROUTES.mainPage.href, main);
				}
			);
		});
	}

	/**
	 * Render a tamlate for a header.
	 */
	#renderTamplate(){
		const template = Handlebars.templates['header.hbs'];
		const urlMain = ROUTES.mainPage.href;
		const urlLogin = ROUTES.loginPage.href;
		const flag = auth.is_auth;
		this.#parent.innerHTML = template({urlMain, urlLogin, flag});
	}
}
