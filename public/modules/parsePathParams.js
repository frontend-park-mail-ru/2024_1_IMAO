'use strict';

/**
 * Function parses path params.
 * @param {string} path
 * @param {string} url
 * @return {string}
 */
export function parsePathParams(path, url) {
  const params = {};
  const pathParts = path.split('/');
  const urlParts = url.split('/');

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];
    if (part.startsWith(':')) {
      const paramName = part.slice(1);
      const paramValue = urlParts[i];
      params[paramName] = paramValue;
    }
  }

  return params;
}

/**
 *
 * @param {*} path
 * @param {*} params
 * @return {string}
 */
export function buildUrl(path, params) {
  let url = path.pathname;
  console.log(url);
  for (const paramName in params) {
    if (params.hasOwnProperty(paramName)) {
      url = url.replace(':' + paramName, params[paramName]);
    }
  }
  path.pathname = url;
  const pathDub = path;
  return pathDub;
}
