'use strict';

const emailRegex = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
const specialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
export const passwordError = 'Пароль не удовлетворяет условиям!';
export const emailError = 'Неверно указан адресс электронной почты!';

/**
 * Returns true if parameter is a string.
 * @param {object} input - object to be checked.
 * @returns {boolean} result of check.
 */
export function isString(input) {
	return typeof input === 'string' || input instanceof String;
}

/**
 * Returns true if parameter is a string.
 * @param {object} input - object to be checked.
 * @throws {TypeRrror} when parameter is not a string.
 */
export function assertString(input) {
	const isStr = isString(input);

	if (!isStr) {
		throw new TypeError("Expected a string");
	}
}

/**
 * Returns true if parameter is a digit.
 * @param {string} input - string to be checked.
 * @returns {boolean} result of check.
 * @throws {TypeRrror} when parameter is not a string.
 */
export function isDigit(input) {
	assertString(input);
	
	return input >= '0' && input <= '9';
}

/**
 * Returns true if parameter is a string in upper case.
 * @param {object} input - string to be checked.
 * @returns {boolean} result of check.
 * @throws {TypeRrror} when parameter is not a string.
 */
export function isUpper(input) {
	assertString(input);
	
	return input.toUpperCase() === input;
}

/**
 * Returns true if parameter is a string in lower case.
 * @param {string} input - string to be checked.
 * @returns {boolean} result of check.
 * @throws {TypeRrror} when parameter is not a string.
 */
export function isLower(input) {
	assertString(input);
	
	return input.toLowerCase() === input;
}

/**
 * Returns true if parameter satisfies email regex.
 * @param {string} input - string to be checked.
 * @returns {boolean} result of check.
 * @throws {TypeRrror} when parameter is not a string.
 */
export function validateEmail(email) {
	assertString(email);
	
	return emailRegex.test(email);
}

/**
 * Returns true if parameter satisfies password rules.
 * @param {string} input - string to be checked.
 * @returns {boolean} result of check.
 * @throws {TypeRrror} when parameter is not a string.
 */
export function validatePassword(password) {
	assertString(password);
	
	if (password.length < 8 || password.length > 32) {
		return false;
	}
	
	let hasUpper = false, hasLower = false, hasDigit = false, hasSpecial = false;
	
	for (const letter of password) {
		if (isDigit(letter)) {
			hasDigit = true;
		} else if (specialChars.includes(letter)) {
			hasSpecial = true;
		} else if (isLower(letter)) {
			hasLower = true;
		} else if (isUpper(letter)) {
			hasUpper = true;
		}
	}
	
	return hasUpper && hasLower && hasDigit && hasSpecial;
}
