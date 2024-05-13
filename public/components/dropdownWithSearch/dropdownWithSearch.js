'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './dropdownWithSearch.hbs';
import styles from './dropdownWithSearch.scss';

/**
 * Class representes a dropdown form field.
 */
class DropdownWithSearch {
  #element;

  /**
   * Constructor for a dropdown form field.
   * @param {Array} items
   * @param {string} current
   */
  constructor(items, current) {
    this.items = items;
    this.current = current;
  }

  /**
   * Returns a dropdown form field component.
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();
    this.#addListeners(this.#element);

    return this.#element;
  }

  /**
   * Renders a dropdown form field template.
   */
  #renderTemplate() {
    const context = {
      items: this.transformData(this.items, this.current),
      current: this.current,
    };

    this.#element = stringToHtmlElement(template(context));
  }

  /**
   * Adds listeners for a dropdown form field.
   * @param {HTMLElement} element
   */
  #addListeners(element) {
    // Open/close
    element.addEventListener('click', (event) => {
      const dropdownSelect = event.target.closest('.dropdown-with-search--select');
      const allDropdownSelects = element.querySelectorAll('.dropdown-with-search--select');

      if (!dropdownSelect) {
        allDropdownSelects.forEach((ds) => {
          ds.classList.remove('open');
          ds.querySelectorAll('.option').forEach((option) => option.removeAttribute('tabindex'));
        });

        return;
      }

      if (event.target.classList.contains('dd-searchbox')) {
        return;
      }

      allDropdownSelects.forEach((ds) => {
        if (ds !== dropdownSelect) {
          ds.classList.remove('open');
        }
      });

      dropdownSelect.classList.toggle('open');
      const allOptions = dropdownSelect.querySelectorAll('.option');

      if (dropdownSelect.classList.contains('open')) {
        allOptions.forEach((option) => option.setAttribute('tabindex', '0'));
        dropdownSelect.querySelector('.selected').focus();

        return;
      }

      allOptions.forEach((option) => option.removeAttribute('tabindex'));
      dropdownSelect.focus();
    });

    // Option click
    element.addEventListener('click', function(event) {
      const option = event.target.closest('.dropdown-with-search--select .option');
      if (option) {
        const dropdownSelect = option.closest('.dropdown-with-search--select');
        dropdownSelect.querySelector('.selected').classList.remove('selected');
        option.classList.add('selected');
        const text = option.dataset.displayText || option.textContent;
        dropdownSelect.querySelector('.dropdown-with-search__current').textContent = text;
        const select = dropdownSelect.previousElementSibling;
        select.value = option.dataset.value;
        select.dispatchEvent(new Event('change'));
      }
    });

    // Keyboard events
    element.addEventListener('keydown', function(event) {
      const dropdownSelect = event.target.closest('.dropdown-with-search--select');

      if (!dropdownSelect) {
        return;
      }

      const focusedOption =
        dropdownSelect.querySelector('.list .option:focus') || dropdownSelect.querySelector('.list .option.selected');
      const isOpend = dropdownSelect.classList.contains('open');

      let buttonPressed = true;
      switch (event.code) {
        case 'Enter':
          if (isOpend) {
            focusedOption.click();
          } else {
            dropdownSelect.click();
          }
          break;

        case 'ArrowDown':
          if (!isOpend) {
            dropdownSelect.click();
          } else {
            focusedOption.nextElementSibling.focus();
          }
          break;

        case 'ArrowUp':
          if (!isOpend) {
            dropdownSelect.click();
          } else {
            focusedOption.previousElementSibling.focus();
          }
          break;

        case 'Escape':
          if (isOpend) {
            dropdownSelect.click();
          }
          break;

        default:
          buttonPressed = false;
          break;
      }

      if (buttonPressed) {
        event.preventDefault();
      }
    });

    const txtSearchValue = element.querySelector('.txtSearchValue');
    txtSearchValue.addEventListener('keyup', filter);

    /**
     * Auxiliary filter function.
     */
    function filter() {
      const valThis = element.querySelector('.txtSearchValue').value;
      element.querySelectorAll('.dropdown-with-search--select ul > li').forEach((li) => {
        const text = li.textContent.toLowerCase();
        if (text.indexOf(valThis.toLowerCase()) > -1) {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      });
    }
  }

  /**
   *
   * @param {*} input
   * @param {*} selectedName
   * @return {Array}
   */
  transformData(input, selectedName) {
    // Проверяем, что входные данные имеют ожидаемый формат
    if (!input || !input.city_list || !input.city_list.CityItems) {
      return;
    }

    // Преобразуем входные данные в выходной формат
    return input.city_list.CityItems.map((item) => ({
      value: item.translation,
      label: item.name,
      id: item.id,
      isSelected: item.name === selectedName,
    }));
  }
}

export default DropdownWithSearch;
