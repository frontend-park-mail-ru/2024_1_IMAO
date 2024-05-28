'use strict';

import CsatComp from '../../components/csatComp/csatComp.js';

/** Class representing a Csat survey page. */
export class Csat {
  #element;

  /**
   * Initialize a Csat survey page.
   */
  constructor() {
    this.#element = document.createElement('div');
  }

  /**
   * Render the Csat survey page.
   * @return {Element} - The element of login page.
   */
  render() {
    this.#renderTemplate();

    return this.#element;
  }

  /**
   * Render a template for a Csat survey page.
   */
  #renderTemplate() {
    const templateParams = {
      CsatTitle: 'Пройдите, пожалуйста, опрос',
      questions: [
        {
          num: 1,
          title: 'Категории',
          postTitle: 'Как вы оцениваете подборку категорий?',
          options: [
            {
              value: 5,
              option: 'Отлично',
            },
            {
              value: 4,
              option: 'Очень хорошо',
            },
            {
              value: 3,
              option: 'Хорошо',
            },
            {
              value: 2,
              option: 'Удовлетворительно',
            },
            {
              value: 1,
              option: 'Плохо',
            },
          ],
        },
        {
          num: 2,
          title: 'Рекомендации',
          postTitle: 'Как вы оцениваете рекомендации?',
          options: [
            {
              value: 5,
              option: 'Отлично',
            },
            {
              value: 4,
              option: 'Очень хорошо',
            },
            {
              value: 3,
              option: 'Хорошо',
            },
            {
              value: 2,
              option: 'Удовлетворительно',
            },
            {
              value: 1,
              option: 'Плохо',
            },
          ],
        },
        {
          num: 3,
          title: 'Оформление',
          postTitle: 'Как вы оцениваете оформление сайта?',
          options: [
            {
              value: 5,
              option: 'Отлично',
            },
            {
              value: 4,
              option: 'Очень хорошо',
            },
            {
              value: 3,
              option: 'Хорошо',
            },
            {
              value: 2,
              option: 'Удовлетворительно',
            },
            {
              value: 1,
              option: 'Плохо',
            },
          ],
        },
        {
          num: 4,
          title: 'Удобство использованиея',
          postTitle: 'Как вы оцениваете удобство использования?',
          options: [
            {
              value: 5,
              option: 'Отлично',
            },
            {
              value: 4,
              option: 'Очень хорошо',
            },
            {
              value: 3,
              option: 'Хорошо',
            },
            {
              value: 2,
              option: 'Удовлетворительно',
            },
            {
              value: 1,
              option: 'Плохо',
            },
          ],
        },
        {
          num: 5,
          title: 'Рекомендация',
          postTitle: 'Порекомендуете ли вы Волчок вашим друзьям?',
          options: [
            {
              value: 5,
              option: 'Да',
            },
            {
              value: 4,
              option: 'Скорее да, чем нет',
            },
            {
              value: 3,
              option: 'Затрудняюсь ответить',
            },
            {
              value: 2,
              option: 'Скорее нет, чем да',
            },
            {
              value: 1,
              option: 'Нет',
            },
          ],
        },
      ],
    };

    const csatComp = new CsatComp(templateParams).render();
    this.#element.appendChild(csatComp);
  }
}
