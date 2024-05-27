'use strict';

/**
 * Formats date.
 * @param {string} isoString
 * @return {string}
 */
export function formatDate(isoString) {
  const date = new Date(isoString);
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  let dateString = new Intl.DateTimeFormat('ru-RU', options).format(date);

  const words = dateString.split(' ');
  words[1] = words[1].slice(0, 3);
  dateString = words.join(' ');

  return dateString.replace(/ г\.$/, '');
}

/**
 * Calculate lefted time due to start time and duration.
 * @param {Number} hours
 * @param {String} startTime
 * @return {Number}
 */
export function calculateLeftTime(hours, startTime) {
  const now = new Date();
  const past = new Date(startTime);

  const diffMilliseconds = now.getTime() - past.getTime();
  const diffHours = diffMilliseconds / (1000 * 60 * 60);

  return Math.round(hours - diffHours);
}
