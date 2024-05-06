'use strict';

/**
 * Formats date.
 * @param {string} isoString
 * @return {string}
 */
export default function formatDate(isoString) {
  const date = new Date(isoString);
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  let dateString = new Intl.DateTimeFormat('ru-RU', options).format(date);

  const words = dateString.split(' ');
  words[1] = words[1].slice(0, 3);
  dateString = words.join(' ');

  return dateString.replace(/ г\.$/, '');
}
