/**
 * Return cookie with given name if it exists.
 * @param {String} name - Cookie name.
 * @return {String} - Cookie value.
 */
export function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));

  return matches ? decodeURIComponent(matches[1]) : null;
}

/**
 * Sets cookie with given name, value and parameteres.
 * @param {String} name - Cookie name.
 * @param {String} value - Cookie value.
 * @param {Object} options - Cookie options.
 */
export function setCookie(name, value, options = {}) {
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + value;

  // eslint-disable-next-line guard-for-in
  for (const optionKey in options) {
    updatedCookie += '; ' + optionKey;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

/**
 * Delete cookie with the given name.
 * @param {String} name - Cookie name.
 */
export function deleteCookie(name) {
  setCookie(name, '', {
    'max-age': -1,
  });
}
