'use strict';
import template from './horizontalButtonGroup.hbs';
import styles from './horizontalButtonGroup.css'; //eslint-disable-line no-unused-vars
import { StringToHtmlElement } from '../../modules/stringToHtmlElement.js';

class HorizontalButtonGroup {
    #element;

    constructor(items){
        this.items = items;
    }

    render() {
        this.#renderTemplate();
        //this.#addListeners();

        return this.#element;
    }

    #renderTemplate() {
        const context = {
            items: this.items,
        };
        this.#element = StringToHtmlElement(template(context));

    }

    // #addListeners() {
    //     const inputs = this.#element.querySelectorAll('.ActiveSoldList input[type="radio"]');

    //     inputs.forEach(input => {
    //         input.addEventListener('click', this.handleClick);
    //     });
    // }

    // #handleClick(event) {
    //     console.log(event.target.value);
    // }

}

export default HorizontalButtonGroup;