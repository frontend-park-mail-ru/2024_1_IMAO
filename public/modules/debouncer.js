'use strict';

/**
 * Debouncer decorator.
 * @param {Function} func - Функция, которую нужно дебоунсить.
 * @param {number} [wait=300] - Задержка в миллисекундах между последовательными вызовами функции.
 * @return {Function} - Возвращает новую функцию, которая при вызове будет выполнять задержку перед вызовом `func`.
 * @example
 */
export default function debounce(func, wait = 300) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // eslint-disable-next-line no-invalid-this
      func.apply(this, args);
    }, wait);
  };
}
