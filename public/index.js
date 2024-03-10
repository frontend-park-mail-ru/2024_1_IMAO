'use strict';

import { ROUTES , locationResolver} from "./routes/routes.js";
import { Ajax } from "./modules/ajax.js";
import { Header } from "./components/header/header.js";
import { Main } from "./pages/main/main.js";
import { Login } from "./pages/login/login.js";
import { Signup } from "./pages/signup/signup.js";

const ajax = new Ajax();

const rootElement = document.getElementById('root');
const mainElement = document.createElement('main');

rootElement.appendChild(mainElement);

ROUTES.init('loginPage', renderLogin);
ROUTES.init('signupPage', renderSignup);
ROUTES.init('mainPage', renderMain);

/**
 * Return login page.
 * @returns {HTMLElement} - The login page.
 */
function renderLogin() {
	mainElement.innerHTML = '';
	const login = new Login();
	return login.render();;
}

/**
 * Return signup page.
 * @returns {HTMLElement} - The signup page.
 */
function renderSignup() {
	mainElement.innerHTML = '';
	const signup = new Signup();
	return signup.render();;
}

/**
 * Return main page.
 * @returns {HTMLElement} - The main page.
 */
function renderMain() {
	mainElement.innerHTML = '';
	const main = new Main();
	return main.render();
}

window.addEventListener('load', () => {
	const location = window.location.hash;

	if (location) {
		locationResolver(location, mainElement);
	}
});

if(window.location.hash === '' ) {
	locationResolver(ROUTES.mainPage.href, mainElement);
}
