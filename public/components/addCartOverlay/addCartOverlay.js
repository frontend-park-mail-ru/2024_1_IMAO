'use strict';
import template from './addCartOverlay.hbs';
import styles from './addCartOverlay.css'; //eslint-disable-line no-unused-vars
import { StringToHtmlElement } from '../../modules/stringToHtmlElement.js';
import router from '../../router/router.js';
import ajax from '../../modules/ajax.js';

class AddCartOverlay {
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
        // const isAppended = this.isAppended;
        this.#element = StringToHtmlElement(template());

    }

    #addListeners() {
        const myButton = this.button;
        myButton.addEventListener('click', (ev) => {
            myDialog.showModal();
            ev.preventDefault();
            const advertId = Number(myButton.dataset['id']);

            ajax.post(
              ajax.routes.CART.CHANGE_CART_ITEM_STATUS,
              {advertId},
              (body) => {
                const {isAppended} = body;

                if(isAppended === undefined) {
                  return;
                }

                const textToChange = this.#element.querySelector('.text-to-change');

                if(isAppended) {
                  textToChange.innerHTML = 'Товар добавлен в корзину';
                } else {
                  textToChange.innerHTML = 'Товар удалён из корзины';
                }
              },
            );
        });

        const myDialog = this.#element;
        myDialog.addEventListener('click', () => {
            myDialog.close();
        });

        const myDiv = this.#element.querySelector('.container');
        myDiv.addEventListener('click', (event) => event.stopPropagation());

        const blockBtn = this.#element.querySelector('.action-button-blacklist');
        blockBtn.addEventListener('click', (event) => {
          myDialog.close();
          router.pushPage(event, router.routes.cartPage.href.href);
        });

        const cancelBtn = this.#element.querySelector('.cancel-button-blacklist');
        cancelBtn.addEventListener('click', (event) => myDialog.close());
    }

}

export default AddCartOverlay;