'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './priceHistoryOverlay.hbs';
import './priceHistoryOverlay.scss';
import formatDate from '../../modules/formatDate.js';
import {renderChartGradient, COLOR} from '../../modules/chartRender.js';

/**
 * Class represented an overlay with price history.
 */
class PriceHistoryOverlay {
  #element;

  /**
   * Constructor for overlay.
   * @param {HTMLElement} button
   * @param {Array} dataArray
   */
  constructor(button, dataArray) {
    this.button = button;
    this.dataArray = dataArray;
    if (dataArray.length == 1) {
      dataArray.push(dataArray[0]);
    }
    this.priceArray = this.dataArray.map((value) => value.newPrice);
  }

  /**
   * Returns an overlay.
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();
    this.#renderChart();
    this.#addListeners();
    this.#addSliderListeners();

    return this.#element;
  }

  /**
   * Renders an overlay.
   */
  #renderTemplate() {
    const pointsArray = this.priceArray.map((value, index) => {
      return {value, index};
    });
    const context = {
      price: this.priceArray[this.priceArray.length - 1],
      priceMin: Math.min(...this.priceArray),
      priceMax: Math.max(...this.priceArray),
      beginDate: formatDate(this.dataArray[0].updatedTime),
      endDate: formatDate(this.dataArray[this.dataArray.length - 1].updatedTime),
      points: pointsArray,
    };
    this.#element = stringToHtmlElement(template(context));
  }

  /**
   * Renders a chart with price history.
   */
  #renderChart() {
    this.canvas = this.#element.querySelector('.price-history-modal__canvas');
    this.context = this.canvas.getContext('2d');
    this.coordinatesArray = renderChartGradient(this.canvas, this.context, this.priceArray);
  }

  /**
   * Add listeners for chart slider.
   */
  #addSliderListeners() {
    const sections = this.#element.querySelectorAll('[data-point]');

    sections.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        renderChartGradient(this.canvas, this.context, this.priceArray);
        const {x, y} = this.coordinatesArray[element.dataset.point];
        this.context.beginPath();
        this.context.arc(x, y, 10, 0, 2 * Math.PI, false);
        this.context.fillStyle = COLOR.GRADIENT;
        this.context.fill();
        const message = this.#element.querySelector('.message');
        this.#createTooltip(message, element.dataset.point);
      });

      element.addEventListener('mouseleave', () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        renderChartGradient(this.canvas, this.context, this.priceArray);
        const message = this.#element.querySelector('.message');
        message.classList.add('message--hidden');
      });
    });
  }

  /**
   * Creates a tooltip with price and date.
   * @param {HTMLElement} message
   * @param {Number} index
   */
  #createTooltip(message, index) {
    message.classList.remove('message--hidden');
    const date = message.querySelector('.message__date');
    date.innerHTML = `${formatDate(this.dataArray[index].updatedTime)}`;
    const price = message.querySelector('.message__price');
    price.innerHTML = `${this.priceArray[index]} ₽`;
    console.log(this.coordinatesArray[index].y);
    message.style.top = `${this.coordinatesArray[index].y + 90}px`;
    if (index == this.coordinatesArray.length - 1) {
      message.style.left = `${this.canvas.offsetWidth - 40}px`;
    } else if (this.coordinatesArray[index].x > 100) {
      message.style.left = `${this.coordinatesArray[index].x - 20}px`;
    } else {
      message.style.left = '100px';
    }
  }

  /**
   * Add listeners for overlay.
   */
  #addListeners() {
    const myButton = this.button;
    myButton.addEventListener('click', (ev) => {
      myDialog.showModal();
      ev.preventDefault();
      const advertId = Number(myButton.dataset['id']);
    });

    const myDialog = this.#element;
    myDialog.addEventListener('click', () => {
      myDialog.close();
    });

    const myDiv = this.#element.querySelector('.price-history-dialog__container');
    myDiv.addEventListener('click', (event) => event.stopPropagation());
  }
}

export default PriceHistoryOverlay;
