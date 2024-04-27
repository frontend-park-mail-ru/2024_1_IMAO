import template from './histogram.hbs';
import styles from './histogram.scss';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import ajax from '../../modules/ajax.js';

/** */
class Histogram {
  #element;
  /**
   *
   * @param {*} items
   */
  constructor(items) {
    this.items = items;
  }

  /**
   *
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();
    this.#renderHistogram();

    return this.#element;
  }

  /**
   *
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
    this.#element = stringToHtmlElement(template(templateParams));
  }

  /**
   *
   */
  #renderHistogram() {
    const chartBars = this.#element.querySelectorAll('.chart__bar');

    const values = {
      name: 65,
      age: 105,
      weight: 140,
    };

    let results = [];
    const apiRoute = ajax.routes.SURVEY.STATISTICS;
    ajax.get(
        apiRoute,
        (body) => {
          results = body.results;
        },
    );

    console.log(results);

    const color = '#B6DCFE';

    chartBars.forEach((item, index) => {
      item.style.width = '50px'; // values[item.textContent] + 'px';
      item.style.backgroundColor = color;
    });
  }
}

export default Histogram;
