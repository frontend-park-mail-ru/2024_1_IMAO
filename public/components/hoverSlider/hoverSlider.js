'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './hoverSlider.hbs';
import styles from './hoverSlider.scss';

/**
 * Class represents a hover adsCard slider.
 */
class HoverSlider {
  #element;

  /**
   * Constructor for a slider.
   * @param {Array} photos
   */
  constructor(photos) {
    this.photos = photos;
  }

  /**
   * Returns a slider.
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();

    this.#addEventListener();

    return this.#element;
  }

  /**
   * Renders a slider.
   */
  #renderTemplate() {
    const context = {
      photos: this.photos,
    };
    this.#element = stringToHtmlElement(template(context));
  }

  /**
   * Adds listeners for a slider.
   */
  #addEventListener() {
    const slider = ['.hover-slider__main'];

    let nmvItem = 0;
    const fnshPosItem = [];
    let posItem = '';

    // Коориктеровка DOM элементов
    for (let i = 0; i < slider.length; i++) {
      nmvItem = 0;
      const sliderItems = this.#element.querySelectorAll(slider[i] + ' > img');
      sliderItems.forEach(function(item) {
        const wrapper = document.createElement('div');
        item.parentNode.insertBefore(wrapper, item);
        wrapper.appendChild(item);
      });

      const sliderDiv = this.#element.querySelector(slider[i]);
      const nuvDiv = document.createElement('div');
      nuvDiv.className = 'hover_slider_nuv';
      sliderDiv.parentNode.insertBefore(nuvDiv, sliderDiv.nextSibling);

      // Css
      const sliderWidth = sliderDiv.parentNode.offsetWidth;
      const sliderHeight = sliderDiv.parentNode.offsetHeight;
      sliderDiv.style.position = 'absolute';
      sliderDiv.style.width = sliderWidth * sliderDiv.children.length + 'px';
      sliderDiv.style.height = sliderHeight + 'px';
      sliderDiv.parentNode.style.position = 'relative';
      sliderDiv.parentNode.style.overflow = 'hidden';

      // Коориктеровка .hover_slider_nuv
      const nuvItems = sliderDiv.querySelectorAll('.hover_slider__item');
      nuvItems.forEach(function() {
        const nuvItem = document.createElement('div');
        nuvDiv.insertBefore(nuvItem, nuvDiv.firstChild);
        nmvItem++;
      });
      const nuvWmax = 215 / nmvItem;
      const nuvWclamp = 37.5 / nmvItem;
      const nuvWmin = 129 / nmvItem;
      const nuvDivItems = nuvDiv.querySelectorAll('div');
      nuvDivItems.forEach(function(item, index) {
        item.style.width = `clamp(${nuvWmin}px, ${nuvWclamp}vw, ${nuvWmax}px)`;
      });
    }

    // Получение отступов .hover_slider__item
    for (let i = 0; i < slider.length; i++) {
      const sliderItems = this.#element.querySelectorAll(slider[i] + ' > .hover_slider__item');
      let initialOffset = 0;
      sliderItems.forEach(function(item) {
        posItem += initialOffset + ',';
        initialOffset += 215;
      });
      const pns = posItem.split(',');
      pns.pop();
      fnshPosItem.push(pns);
      posItem = '';
    }

    // Функционал
    const theElement = this.#element;
    this.#element.querySelectorAll('.hover_slider_nuv div').forEach(function(item) {
      ['mouseover', 'touchenter'].forEach((evt) => {
        item.addEventListener(evt, function() {
          // eslint-disable-next-line no-invalid-this
          const obj = this;
          const pictureArray = Array.from(obj.parentNode.previousElementSibling.children);
          const helpArray = Array.from(obj.parentNode.children);
          const width = pictureArray[0].offsetWidth;
          const indItem = helpArray.indexOf(obj);
          for (let i = 0; i < slider.length; i++) {
            const sliderElement = theElement.querySelector(slider[i]);
            const takwData = sliderElement.getAttribute('data-mode');
            if (takwData === 'slide') {
              sliderElement.style.top = -width * indItem + 'px';
            } else if (takwData === 'fade') {
              sliderElement.style.top = -width * indItem + 'px';
            }
          }
        });
      });
    });

    this.#element.querySelectorAll('.hover_slider_nuv > div').forEach((hoverDiv, index) => {
      hoverDiv.addEventListener('mouseover', () => {
        const ellipseDivs = this.#element.querySelectorAll('.hover-slider__ellipse-line > .hover-slider__ellipse');
        ellipseDivs.forEach((ellipseDiv, ellipseIndex) => {
          if (ellipseIndex === index) {
            ellipseDiv.style.background = 'rgb(255, 255, 255)'; // Change color to red
          } else {
            ellipseDiv.style.backgroundColor = 'rgb(255, 255, 255,  0.64)'; // Reset color
          }
        });
      });
    });

    this.#element.addEventListener('mouseleave', () => {
      this.#element.querySelector('.hover-slider__ellipse-line').style.display = 'none';
    });

    this.#element.addEventListener('mouseenter', () => {
      this.#element.querySelector('.hover-slider__ellipse-line').style.display = 'flex';
    });

    this.#element.addEventListener('mouseleave', () => {
      this.#element.querySelector('.hover-slider__main').style.top = '0';
    });

    this.#element.querySelectorAll('.hover-slider__main').forEach(function(slider) {
      slider.style.width = slider.parentNode.offsetWidth + 'px';
    });
  }
}

export default HoverSlider;
