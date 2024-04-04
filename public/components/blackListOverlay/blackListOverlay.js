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
        console.log(myButton);
        myButton.addEventListener('click', () => {
            myDialog.showModal();
            console.log('Кнопка была нажата');
        });

        const myDialog = this.#element;
        //myDialog.addEventListener('click', () => myDialog.close());
        myDialog.addEventListener('click', () => {
            myDialog.close();
            console.log('Закройся');
        });

        const myDiv = this.#element.querySelector('.container');
        myDiv.addEventListener('click', (event) => event.stopPropagation());
    }

}

export default BlackListOverlay;
