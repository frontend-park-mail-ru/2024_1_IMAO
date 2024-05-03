'use strict';

/**
 *
 * @param {Function} func - Функция, которую нужно дебоунсить.
 * @param {number} [wait=300] - Задержка в миллисекундах между последовательными вызовами функции.
 * @returns {Function} - Возвращает новую функцию, которая при вызове будет выполнять задержку перед вызовом `func`.
 * @example
 */

export default function debounce(func, wait = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }