'use strict';

import { ROUTES, locationResolver } from "../../routes/routes.js";

export class Header{
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render(){
        this.#renderTamplate();
        this.#addListeners();
    }

    #addListeners(){
        const anchors = this.#parent.getElementsByTagName('a');

        for (const anchor of anchors) {
            if (anchor.dataset.url == undefined) {
                continue;
            }

            anchor.addEventListener('click', (ev) => {
                const main = document.getElementsByTagName('main')[0];
                locationResolver(anchor.dataset.url, main);
            })
        }

    }    
    
    #renderTamplate(){
        const template = Handlebars.templates['header.hbs'];
        const urlMain = ROUTES.mainPage.href;
        const urlLogin = ROUTES.loginPage.href;
        const flag = true;
        this.#parent.innerHTML = template({urlMain, urlLogin, flag});
    }
}