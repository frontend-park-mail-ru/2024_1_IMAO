'use strict';

/**
 * Returns an HTMLElement from string.
 * @param {String} string HTML элемент в виде строки
 * @return {Element}
 */
export default function stringToHtmlElement(string) {
  const template = document.createElement('template');
  string = string.trim();
  template.innerHTML = string;

  return template.content.firstChild;
}
