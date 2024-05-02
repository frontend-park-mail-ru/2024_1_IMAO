import template from './histogram.hbs';
import styles from './histogram.scss';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import ajax from '../../modules/ajax.js';

/**
 * Class represents a statistics histogram.
 */
class Histogram {
  #element;
  /**
   * Constructor for a histogram.
   * @param {*} items
   */
  constructor(items) {
    this.items = items;
  }

  /**
   * Returns a statistics histogram.
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();
    this.#renderHistogram();

    return this.#element;
  }

  /**
   * Renders a statistics histogram.
   */
  #renderTemplate() {
    const templateParams = {
      questions: [
        {
          num: 1,
          title: 'Категории',
          options: [
            {
              option: 'Отлично',
            },
            {
              option: 'Очень хорошо',
            },
            {
              option: 'Хорошо',
            },
            {
              option: 'Удовлетворительно',
            },
            {
              option: 'Плохо',
            },
          ],
        },
        {
          num: 2,
          title: 'Рекомендации',
          options: [
            {
              option: 'Отлично',
            },
            {
              option: 'Очень хорошо',
            },
            {
              option: 'Хорошо',
            },
            {
              option: 'Удовлетворительно',
            },
            {
              option: 'Плохо',
            },
          ],
        },
        {
          num: 3,
          title: 'Оформление',
          options: [
            {
              option: 'Отлично',
            },
            {
              option: 'Очень хорошо',
            },
            {
              option: 'Хорошо',
            },
            {
              option: 'Удовлетворительно',
            },
            {
              option: 'Плохо',
            },
          ],
        },
        {
          num: 4,
          title: 'Удобство использованиея',
          options: [
            {
              option: 'Отлично',
            },
            {
              option: 'Очень хорошо',
            },
            {
              option: 'Хорошо',
            },
            {
              option: 'Удовлетворительно',
            },
            {
              option: 'Плохо',
            },
          ],
        },
        {
          num: 5,
          title: 'Рекомендация',
          options: [
            {
              option: 'Да',
            },
            {
              option: 'Скорее да, чем нет',
            },
            {
              option: 'Затрудняюсь ответить',
            },
            {
              option: 'Скорее нет, чем да',
            },
            {
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
    ajax.get(apiRoute, (body) => {
      results = body.body.results;
      const rowData = [];

      for (const i of results) {
        const j = i.QuestionResults.reverse();
        for (const k of j) {
          rowData.push(k);
        }
      }
      console.log(rowData);

      const color = '#B6DCFE';

      chartBars.forEach((item, index) => {
        item.style.width = 70 * rowData[index] + 'px';
        item.style.backgroundColor = color;
      });
    });
  }
}

export default Histogram;
