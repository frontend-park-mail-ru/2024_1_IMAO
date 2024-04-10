'use strict';
/**
 * Trimed string
 * @param {string} string
 * @return {string}
 */
export function trimString(string, maxChars) {
  if(string.length <= maxChars) {
    return string;
  }

  return string.slice(0,maxChars-1) + '..';
}
