'use strict';

import { renderAdsCardTamplate } from "../../components/adsCard/adsCard.js";
import { Ajax } from "../../modules/ajax.js";
import { ROUTES } from "../../routes/routes.js";

const ajax = new Ajax();

export class Main{
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render(){
        this.#renderTamplate();
    }
    
    #renderTamplate(){
        const title = document.createElement('h1');
        title.innerHTML = 'Все объявления';
        this.#parent.appendChild(title)

        ajax.get(
            ROUTES.main,
            (ads) => {
                const adverts = ads['adverts']
                if (adverts && Array.isArray(adverts)) {
        
                adverts.forEach((inner) => {
                    const {price, title} = inner;
                    const div = document.createElement('div');
                    div.style.display = 'inline-block';
                    div.style.padding = '1%';
                    div.innerHTML += renderAdsCardTamplate(title, price);
                    this.#parent.appendChild(div);
                });
                }
            }
        )

    }
}