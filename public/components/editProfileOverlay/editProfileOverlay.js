'use strict';

import template from './editProfileOverlay.hbs';
import styles from './editProfileOverlay.css'; //eslint-disable-line no-unused-vars
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';
import {StringToHtmlElement} from '../../modules/stringToHtmlElement.js';

class EditProfileOverlay {
    #element;

    constructor(button, data) {
        this.button = button;
        this.data = data;
    }

    render() {
        this.#renderTemplate();
        this.#addListeners();

        return this.#element;
    }

    #renderTemplate() {
        const context = {
            title: this.data.title,
            fields: this.data.fields,
            id: this.data.id,
        };

        this.#element = StringToHtmlElement(template(context));
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

        const cancelBtn = this.#element.querySelector('.cancel-button-blacklist');
        cancelBtn.addEventListener('click', (event) => myDialog.close());
    }
}

export default EditProfileOverlay;
