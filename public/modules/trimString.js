'use strict';
/**
 * Trimed string
 * @param {string} string
 * @param {number} maxChars
 * @return {string}
 */
export default function trimString(string, maxChars) {
  if (string.length <= maxChars) {
    return string;
  }

  return string.slice(0, maxChars-1) + '..';
}
