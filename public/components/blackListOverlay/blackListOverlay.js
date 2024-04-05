'use strict';
import template from './blackListOverlay.hbs';
import styles from './blackListOverlay.css'; //eslint-disable-line no-unused-vars
import { StringToHtmlElement } from '../../modules/stringToHtmlElement.js';

class BlackListOverlay {
    #element;

    constructor(button) {
        this.button = button;

    }

    render() {
        this.#renderTemplate();

        this.#addListeners();

        return this.#element;
    }

    #renderTemplate() {

        this.#element = StringToHtmlElement(template());

    }

    #addListeners() {
        const myButton = this.button;
        myButton.addEventListener('click', () => {
            myDialog.showModal();
        });

        const myDialog = this.#element;
        myDialog.addEventListener('click', () => {
            myDialog.close();
        });

        const myDiv = this.#element.querySelector('.container');
        myDiv.addEventListener('click', (event) => event.stopPropagation());

        const blockBtn = this.#element.querySelector('.action-button-blacklist');
        blockBtn.addEventListener('click', (event) => myDialog.close());

        const cancelBtn = this.#element.querySelector('.cancel-button-blacklist');
        cancelBtn.addEventListener('click', (event) => myDialog.close());
    }

}

export default BlackListOverlay;
