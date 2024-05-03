'use strict';

/**
 * Formats date.
 * @param {string} isoString
 * @return {string}
 */
export default function formatDate(isoString) {
  const date = new Date(isoString);
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  const dateString = new Intl.DateTimeFormat('ru-RU', options).format(date);

  return dateString.replace(/ г\.$/, '');
}
