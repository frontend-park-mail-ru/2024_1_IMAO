'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './dropdownWithSearch.hbs';
import styles from './dropdownWithSearch.scss';

/**
 *
 */
class DropdownWithSearch {
  #element;
  /**
   *
   * @param {*} items
   */
  constructor(items, current) {
    this.items = items;
    this.current = current;
  }

  /**
   *
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();
    this.#addListeners(this.#element);
    return this.#element;
  }

  /**
   *
   */
  #renderTemplate() {
    const context = {
      items: this.transformData(this.items, this.current),
      current: this.current
    };
    console.log('context', context)
    this.#element = stringToHtmlElement(template(context));
  }

    #addListeners(element) {
        // Open/close
        element.addEventListener('click', function (event) {
            let dropdownSelect = event.target.closest('.dropdown-select');
            if (dropdownSelect) {
                if (event.target.classList.contains('dd-searchbox')) {
                    return;
                }
                element.querySelectorAll('.dropdown-select').forEach(function (ds) {
                    if (ds !== dropdownSelect) {
                        ds.classList.remove('open');
                    }
                });
                dropdownSelect.classList.toggle('open');
                if (dropdownSelect.classList.contains('open')) {
                    dropdownSelect.querySelectorAll('.option').forEach(function (option) {
                        option.setAttribute('tabindex', '0');
                    });
                    dropdownSelect.querySelector('.selected').focus();
                } else {
                    dropdownSelect.querySelectorAll('.option').forEach(function (option) {
                        option.removeAttribute('tabindex');
                    });
                    dropdownSelect.focus();
                }
            } else {
                element.querySelectorAll('.dropdown-select').forEach(function (ds) {
                    ds.classList.remove('open');
                    ds.querySelectorAll('.option').forEach(function (option) {
                        option.removeAttribute('tabindex');
                    });
                });
            }
        });

        // Option click
        element.addEventListener('click', function (event) {
            let option = event.target.closest('.dropdown-select .option');
            if (option) {
                let dropdownSelect = option.closest('.dropdown-select');
                dropdownSelect.querySelector('.selected').classList.remove('selected');
                option.classList.add('selected');
                let text = option.dataset.displayText || option.textContent;
                dropdownSelect.querySelector('.current').textContent = text;
                let select = dropdownSelect.previousElementSibling;
                select.value = option.dataset.value;
                select.dispatchEvent(new Event('change'));
            }
        });

        // Keyboard events
        element.addEventListener('keydown', function (event) {
            let dropdownSelect = event.target.closest('.dropdown-select');
            if (dropdownSelect) {
                let focusedOption = dropdownSelect.querySelector('.list .option:focus') || dropdownSelect.querySelector('.list .option.selected');
                if (event.keyCode === 13) {
                    if (dropdownSelect.classList.contains('open')) {
                        focusedOption.click();
                    } else {
                        dropdownSelect.click();
                    }
                    event.preventDefault();
                } else if (event.keyCode === 40) {
                    if (!dropdownSelect.classList.contains('open')) {
                        dropdownSelect.click();
                    } else {
                        focusedOption.nextElementSibling.focus();
                    }
                    event.preventDefault();
                } else if (event.keyCode === 38) {
                    if (!dropdownSelect.classList.contains('open')) {
                        dropdownSelect.click();
                    } else {
                        focusedOption.previousElementSibling.focus();
                    }
                    event.preventDefault();
                } else if (event.keyCode === 27) {
                    if (dropdownSelect.classList.contains('open')) {
                        dropdownSelect.click();
                    }
                    event.preventDefault();
                }
            }
        });

        
        let txtSearchValue = element.querySelector('.txtSearchValue');
        txtSearchValue.addEventListener('keyup', filter);    
        
        
        function filter() {
            let valThis = element.querySelector('.txtSearchValue').value;
            element.querySelectorAll('.dropdown-select ul > li').forEach(function (li) {
                let text = li.textContent.toLowerCase();
                if (text.indexOf(valThis.toLowerCase()) > -1) {
                    li.style.display = '';
                } else {
                    li.style.display = 'none';
                }
            });
        }
        
  
    }

    transformData(input, selectedName) {
        // Проверяем, что входные данные имеют ожидаемый формат
        console.log('input', input)
        if (!input || !input.city_list || !input.city_list.CityItems) {
            return;
        }
    
        // Преобразуем входные данные в выходной формат
        return input.city_list.CityItems.map(item => ({
            value: item.translation,
            label: item.name,
            isSelected: item.name === selectedName // Устанавливаем isSelected в true только для selectedName
        }));
    }

    // #handleClick(event) {
    //     console.log(event.target.value);
    // }
}

export default DropdownWithSearch;
