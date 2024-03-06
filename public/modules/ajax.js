'use strict'

const OUTER_API = 'http://127.0.0.1:8080';
const GET = 'GET';
const POST = 'POST';

/** Class implements AJAX requests. */
export class Ajax{

	/**
	 * Make a POST request.
	 * @param {string} url - The request path.
	 * @param {URLSearchParams} body - The request body.
	 * @param {function} callback - The callback function.
	 */
	post(url, body, callback){
		const init = {
			method: POST,
			mode: 'cors',
			credentials: 'include',
			body: body,
		}

		this.#ajax(this.#fullAdress(url), callback, init, arguments);
	}

	/**
	 * Make a GET request.
	 * @param {string} url - The request path.
	 * @param {function} callback - The callback function.
	 */
	get(url, callback){
		const init = {
			method: GET,
			mode: "cors",
			credentials: 'include',
		}

		this.#ajax(this.#fullAdress(url), callback, init, arguments);
	}

	/**
	 * Make a full adress to API.
	 * @param {string} route - The relative request path.
	 * @returns {string} - The full request path.
	 */
	#fullAdress(route){
		return(OUTER_API + route);
	}

	/**
	 * Make scheme of the AJAX request.
	 * @param {string} url - The relative request path.
	 * @param {function} callback - The callback function.
	 * @param {object} init - Options of the request.
	 */
	#ajax(url, callback, init) {
		fetch(url, init)
			.then(response => {
				if(response.ok){
					return response.json()
				} else {
					console.log(`${response.status} ERROR: ${response.statusText}`)
				}
			})

			.then(data => callback(data))
			.catch(err => alert(err));
	}
}
