'use strict';

import { renderAdsCardTamplate } from "../../components/adsCard/adsCard.js";
import { Ajax } from "../../modules/ajax.js";
import { ROUTES } from "../../routes/routes.js";

const ajax = new Ajax();

/** Class representing a main page. */
export class Main{
    #parent;

    /**
     * Initialize a main page.
     * @param {HTMLElement} parent - The container for a main page.
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Render the main page.
     */
    render(){
        this.#renderTamplate();
    }
    
    /**
     * Render a tamlate for a main page.
     */
    #renderTamplate(){
        const title = document.createElement('h1');
        title.innerHTML = 'Все объявления';
        this.#parent.appendChild(title)

        ajax.get(
            ROUTES.main,
            (ads) => {
                const adverts = ads['adverts']
                if (!(adverts && Array.isArray(adverts))) {
                    return;
                }

                adverts.forEach((inner) => {
                    const {price, title} = inner;
                    const div = document.createElement('div');
                    div.classList.add('cards-div');
                    div.innerHTML += renderAdsCardTamplate(title, price);
                    this.#parent.appendChild(div);
                });
            },
        );
    }
}
