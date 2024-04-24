'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './hoverSlider.hbs';
import styles from './hoverSlider.scss';


/**
 *
 */
class HoverSlider {
  #element;

  /**
   *
   * @param {*} items
   */
  constructor(photos) {
    this.photos = photos;
  }

  /**
   *
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();

    this.#addEventListener();

    return this.#element;
  }

  /**
   *
   */
  #renderTemplate() {
    console.log('this.photos', this.photos)
    const context = {
      photos: this.photos
    };
    this.#element = stringToHtmlElement(template(context));
  }

  #addEventListener() {
    let slider = ['.hover-slider'], // <=== Write selector of your slider in ''
        speedSlider = 500;

    let nmvItem = 0,
    fnshPosItem = [],
    posItem = '';

    // Коориктеровка DOM элементов
    for (let i = 0; i < slider.length; i++) {
        nmvItem = 0;
        let sliderItems = this.#element.querySelectorAll(slider[i] + ' > img');
        sliderItems.forEach(function(item) {
            let wrapper = document.createElement('div');
            item.parentNode.insertBefore(wrapper, item);
            wrapper.appendChild(item);
        });

        let sliderDiv = this.#element.querySelector(slider[i]);
        let nuvDiv = document.createElement('div');
        nuvDiv.className = 'hover_slider_nuv';
        sliderDiv.parentNode.insertBefore(nuvDiv, sliderDiv.nextSibling);

        // Css
        let sliderWidth = sliderDiv.parentNode.offsetWidth;
        let sliderHeight = sliderDiv.parentNode.offsetHeight;
        sliderDiv.style.position = 'absolute';
        sliderDiv.style.width = sliderWidth * sliderDiv.children.length + 'px';
        sliderDiv.style.height = sliderHeight + 'px';
        sliderDiv.parentNode.style.position = 'relative';
        sliderDiv.parentNode.style.overflow = 'hidden';

        // Коориктеровка .hover_slider_nuv
        let nuvItems = sliderDiv.querySelectorAll('.item_hover_slider');
        nuvItems.forEach(function() {
            let nuvItem = document.createElement('div');
            nuvDiv.insertBefore(nuvItem, nuvDiv.firstChild);
            nmvItem++;
        });
        let nuvW = 215 / nmvItem;
        let nuvDivItems = nuvDiv.querySelectorAll('div');
        nuvDivItems.forEach(function(item, index) {
            item.style.width = nuvW + 'px';
        });
    }

    // Получение отступов .item_hover_slider
    for (let i = 0; i < slider.length; i++) {
        let sliderItems = this.#element.querySelectorAll(slider[i] + ' > .item_hover_slider');
        let initialOffset = 0;
        sliderItems.forEach(function(item) {
            posItem += initialOffset + ',';
            initialOffset += 215;
        });
        let pns = posItem.split(',');
        pns.pop();
        fnshPosItem.push(pns);
        posItem = '';
    }

    // Функционал
    let theElement = this.#element;
    this.#element.querySelectorAll('.hover_slider_nuv div').forEach(function(item) {

        item.addEventListener('mouseover', function() {
            const pictureArray = Array.from(this.parentNode.previousElementSibling.children)
            const helpArray = Array.from(this.parentNode.children)
            let indItem = helpArray.indexOf(this);
            for (let i = 0; i < slider.length; i++) {
                let sliderElement = theElement.querySelector(slider[i]);
                let takwData = sliderElement.getAttribute('data-mode');
                if (takwData === 'slide') {
                    sliderElement.style.top = -fnshPosItem[i][indItem] + 'px';
                } else if (takwData === 'fade') {
                    sliderElement.style.top = -fnshPosItem[i][indItem] + 'px';
                }
            }
        });
    });

    this.#element.querySelectorAll('.hover_slider_nuv > div').forEach((hoverDiv, index) => {
        hoverDiv.addEventListener('mouseover', () => {
            const ellipseDivs = this.#element.querySelectorAll('.ellipse-line > .ellipse');
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
      this.#element.querySelector('.ellipse-line').style.display = 'none'; // Hide ellipse-line
    });

    this.#element.addEventListener('mouseenter', () => {
      this.#element.querySelector('.ellipse-line').style.display = 'flex';
    });

    this.#element.addEventListener('mouseleave', () => {
      this.#element.querySelector('.hover-slider').style.top = '0';
    });

    this.#element.querySelectorAll('.hover-slider').forEach(function(slider) {
        slider.style.width = slider.parentNode.offsetWidth + 'px';
    });
  }
}

export default HoverSlider;
