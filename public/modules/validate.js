'use strict';

/* eslint-disable-next-line max-len, no-useless-escape */
const emailRegex = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
const inputRegex = /^[^\s].(?!.* {2,}).*$/;
/* eslint-disable-next-line max-len */
export const passwordError = 'Пароль должен быть от 8 до 32 символов, содержать цифру, строчную, прописную буквы и специальный символ!';
export const emailError = 'Неверный формат почты!';
export const inputError = 'Значение не должно начинаться с пробела или иметь 2 пробела подряд!';

/**
 * Returns true if parameter is a string.
 * @param {object} input - object to be checked.
 * @return {boolean} result of check.
 */
export function isString(input) {
  return typeof input === 'string' || input instanceof String;
}

/**
 * Throws TypeError if parameter is not a string.
 * @param {object} input - object to be checked.
 * @throws {TypeRrror} when parameter is not a string.
 */
export function assertString(input) {
  const isStr = isString(input);

  if (!isStr) {
    throw new TypeError('Expected string');
  }
}

/**
 * Returns true if parameter is a digit.
 * @param {string} input - string to be checked.
 * @return {boolean} result of check.
 * @throws {TypeRrror} when parameter is not a string.
 */
export function isDigit(input) {
  assertString(input);

  return input >= '0' && input <= '9';
}

/**
 * Returns true if parameter is a string in upper case.
 * @param {object} input - string to be checked.
 * @return {boolean} result of check.
 * @throws {TypeRrror} when parameter is not a string.
 */
export function isUpper(input) {
  assertString(input);

  return input.toUpperCase() === input;
}

/**
 * Returns true if parameter is a string in lower case.
 * @param {string} input - string to be checked.
 * @return {boolean} result of check.
 * @throws {TypeRrror} when parameter is not a string.
 */
export function isLower(input) {
  assertString(input);

  return input.toLowerCase() === input;
}

/**
 * Returns true if parameter satisfies email regex.
 * @param {string} email - string to be checked.
 * @return {boolean} result of check.
 * @throws {TypeRrror} when parameter is not a string.
 */
export function validateEmail(email) {
  assertString(email);

  return emailRegex.test(email);
}

/**
 * Returns true if parameter satisfies password rules.
 * @param {string} password - string to be checked.
 * @return {boolean} result of check.
 * @throws {TypeRrror} when parameter is not a string.
 */
export function validatePassword(password) {
  assertString(password);

  if (password.length < 8 || password.length > 32) {
    return false;
  }

  let hasUpper = false;
  let hasLower = false;
  let hasDigit = false;

  for (const letter of password) {
    if (isDigit(letter)) {
      hasDigit = true;
    } else if (isLower(letter)) {
      hasLower = true;
    } else if (isUpper(letter)) {
      hasUpper = true;
    }
  }

  return hasUpper && hasLower && hasDigit;
}

/**
 * Check if string not empty and doesn`t contain numbers.
 * @param {String} name
 * @return {boolean}
 */
export function validateName(name) {
  const notEmpty = name !== '';
  const isStr = /^[a-zA-Zа-яА-Я]+$/.test(name);

  return notEmpty && isStr;
}

/**
 * Returns true if parameter satisfies input regex.
 * @param {string} input - string to be checked.
 * @return {boolean} result of check.
 * @throws {TypeRrror} when parameter is not a string.
 */
export function validateInput(input) {
  assertString(input);

  return inputRegex.test(input);
}
